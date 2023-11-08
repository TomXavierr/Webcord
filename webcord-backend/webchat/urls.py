from django.urls import path
from . import views

urlpatterns = [
    path('<str:channel_id>/', views.MessageViewSet.as_view(), name='channel-chats'),
]