from django.db import models

# Create your models here.
class StreamURL(models.Model):
    url = models.CharField(max_length=255, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url
    
class AudioFile(models.Model):
    audio = models.FileField(upload_to="audio")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.audio.path

class AudioDetect(models.Model):
    stream = models.ForeignKey(StreamURL, on_delete=models.CASCADE)
    file = models.ForeignKey(AudioFile, on_delete=models.CASCADE)
    time = models.DateTimeField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.time