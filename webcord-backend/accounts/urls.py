from django.urls import path
from .views import UserDetailView

urlpatterns = [
    # ... other URL patterns ...
    path('user-details/', UserDetailView.as_view(), name='user-detail'),
]