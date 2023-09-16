from django.urls import path
from .views import UserDetailView,UserUpdateView

urlpatterns = [
    # ... other URL patterns ...
    path('user-details/', UserDetailView.as_view(), name='user-detail'),
    path('update/', UserUpdateView.as_view(), name='user-update'),

]