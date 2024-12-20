from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainSerializer as JwtTokenObtainPairSerializer
from apis.models import StreamURL, AudioFile, AudioDetect, CustomUser

class TokenObtainPairSerializer(JwtTokenObtainPairSerializer):
    username_field = get_user_model().USERNAME_FIELD


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'first_name', 'last_name', 'email', 'password')


class PasswordSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

class StreamURLSerializer(serializers.ModelSerializer):
    url = serializers.CharField()
    
    class Meta:
        model = StreamURL
        fields = '__all__'

class AudioFileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    class Meta:
        model = AudioFile
        fields = '__all__'

class AudioDetectSerializer(serializers.ModelSerializer):
    filename = serializers.SerializerMethodField()

    class Meta:
        model = AudioDetect
        fields = '__all__'

    def get_filename(self, obj):
        if obj.file and obj.file.audio:
            return obj.file.audio.name
        return None