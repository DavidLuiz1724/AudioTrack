from django.urls import path
from apis import views

urlpatterns = [
    path('audio/', views.AudioFileView.as_view({'get': 'list'}), name='audio'),
    path('stream_url/', views.StreamURLView.as_view({'get': 'list', 'post': 'create'}), name='stream_url'),
    path('audio_time/', views.AudioDetectView.as_view({'get': 'list'}), name='time'),
]