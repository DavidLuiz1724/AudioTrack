from rest_framework import serializers
from apis.models import StreamURL, AudioFile, AudioDetect


class StreamURLSerializer(serializers.ModelSerializer):
    url = serializers.CharField()
    
    class Meta:
        model = StreamURL
        fields = '__all__'

class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = '__all__'

class AudioDetectSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioDetect
        fields = '__all__'