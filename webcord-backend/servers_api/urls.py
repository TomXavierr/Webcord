# server_api/urls.py

from django.urls import path, include
from rest_framework import routers
from .views import ServerDetailsAPIView

# Create a router
router = routers.DefaultRouter()

# Register your viewsets with the router
# router.register(r'servermembers', views.ServerMemberViewSet)
# router.register(r'channels', views.ChannelViewSet)

# Define your app's URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('server_details/<int:id>/', ServerDetailsAPIView.as_view(), name='server_details'),
]

# Join these URL patterns with the root URLs in the project
