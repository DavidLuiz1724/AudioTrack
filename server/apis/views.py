from django.http import HttpResponse
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from apis.serializers import *
from apis.models import *

# Create your views here.
class SignUpView(APIView):
    http_method_names = ['post']

    def post(self, request, *args, **kwargs):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            get_user_model().objects.create_user(**serializer.validated_data)
            return HttpResponse(status=status.HTTP_201_CREATED)
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

class AudioDetectView(viewsets.ModelViewSet):
    """
    A viewset for the AudioDetect model
    """
    serializer_class = AudioDetectSerializer
    
    def get_queryset(self):
        queryset = AudioDetect.objects.all()
        stream_id = self.request.query_params.get("stream_id", None)
        if stream_id is not None:
            queryset = queryset.filter(stream__id=stream_id)
        file_id = self.request.query_params.get("file_id", None)
        if file_id is not None:
            queryset = queryset.filter(file__id=file_id)
        return queryset

class AudioFileView(viewsets.ModelViewSet):
    """
    A viewset for the AudioFile model
    """
    model = AudioFile
    serializer_class = AudioFileSerializer
    
    def get_queryset(self):
        queryset = AudioFile.objects.all()
        return queryset
    
    def post(self, request):
        serializer = AudioFileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse(status=status.HTTP_200_OK)
        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StreamURLView(viewsets.ModelViewSet):
    """
    A viewset for the StreamURL model
    """
    model = StreamURL
    serializer_class = StreamURLSerializer
    queryset = StreamURL.objects.all()

    def create(self, request):
        serializer = StreamURLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            streams = StreamURL.objects.all()
            return HttpResponse(streams, status=status.HTTP_201_CREATED)
        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        id = request.query_params.get("id", None)
        if id is not None:
            StreamURL.objects.filter(pk=id).delete()
        return HttpResponse(status=status.HTTP_200_OK)