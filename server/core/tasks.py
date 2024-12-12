# core/tasks.py

import os
import subprocess
import librosa
from celery import shared_task
from datetime import datetime, timedelta
from scipy import signal
import numpy as np
from django.http import HttpResponse
from django.conf import settings

def find_audio_match(long_audio_path, short_audio_path, sampling_rate=44100):
    # Load the audio files
    long_audio, _ = librosa.load(long_audio_path, sr=sampling_rate, mono=True)
    short_audio, _ = librosa.load(short_audio_path, sr=sampling_rate, mono=True)

    # Compute cross-correlation
    correlation = signal.correlate(long_audio, short_audio, mode='valid')
    match_start = np.argmax(correlation)
    match_score = np.max(correlation)
    match_time = match_start / sampling_rate

    return match_start, match_score, correlation

@shared_task
def track_audio_from_url(stream_id):
    from apis.models import AudioFile, StreamURL, AudioDetect
    try:
        stream = StreamURL.objects.get(id=stream_id)
    except:
        return HttpResponse(status=404)
    output_dir = "captured"
    os.makedirs(output_dir, exist_ok=True)
    files = AudioFile.objects.all()
    maxlen = 0
    sample_rate = 44100
    for file in files:
        ad_audio, sample_rate = librosa.load(os.path.join(settings.BASE_DIR, file.audio.name), sr=sample_rate, mono=True)
        if maxlen < len(ad_audio):
            maxlen = len(ad_audio)

    seconds = int(maxlen / sample_rate + 1800)
    hour = int(seconds / 3600)
    min = int(seconds / 60) - 60 * int(seconds / 3600)
    sec = seconds - 60 * int(seconds / 60)
    today = datetime.now()
    output_filename = f"{output_dir}/{today.strftime('%Y-%m-%d_%H-%M-%S')}_{stream_id}.wav"

    # Command to use ffmpeg to capture the stream
    command = [
        'ffmpeg',
        '-i', stream.url,
        '-t', f"{hour}:{min}:{sec}",
        '-c', 'copy',
        output_filename
    ]

    try:
        subprocess.run(command, check=True)
        print(f"Captured audio saved to {output_filename}")
        
    except subprocess.CalledProcessError as e:
        print(f"Error capturing audio: {e}")

    for audio_file in os.listdir(output_dir):
        filename = os.path.basename(audio_file)
        date = datetime.strptime(filename[:19], "%Y-%m-%d_%H-%M-%S")
        if date + timedelta(hours=2) < today:
            os.remove(f"{output_dir}/{audio_file}")
    
    for file in files:
        ad_audio_path = os.path.join(settings.BASE_DIR, file.audio.name)
        _, score, _ = find_audio_match(ad_audio_path, ad_audio_path, sample_rate)
        _, match_score, correlation = find_audio_match(output_filename, ad_audio_path, sample_rate)
        if match_score > 0.9 * score:
            match_all = np.where(correlation > match_score * 0.95)
            match_indices = match_all[0]  
            match_times = list(set(map(lambda x: int(np.round(x / sample_rate)), match_indices)))
            
            for match_time in match_times:
                if match_time < 1800:
                    AudioDetect.objects.create(stream_id=stream_id, file=file, time=today + timedelta(seconds=match_time))


@shared_task
def track_time():
    from apis.models import StreamURL
    streams = StreamURL.objects.all()
    for stream in streams:
        track_audio_from_url.delay(stream.id)