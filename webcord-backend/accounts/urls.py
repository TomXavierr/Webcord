from django.urls import path

from .views import ChangePasswordView, UserDetailView, UserUpdateView

urlpatterns = [
    # ... other URL patterns ...
    path('user-details/', UserDetailView.as_view(), name='user-detail'),
    path('update/', UserUpdateView.as_view(), name='user-update'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),

]