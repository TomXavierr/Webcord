from django.urls import path
from .views import ServerDetailAPIView

urlpatterns = [
    path('server-details/<int:pk>/', ServerDetailAPIView.as_view(), name='server-detail'),
    # Add other URL patterns for your other APIs as needed.
]