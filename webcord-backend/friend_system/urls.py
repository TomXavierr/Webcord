from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import FriendRequestViewSet

router = DefaultRouter()
router.register(r'friend-requests', FriendRequestViewSet, basename='friend-request')

urlpatterns = [
    path('', include(router.urls)),
]
