from django.urls import path
from .views import ServerDetailAPIView, ServerCreateView, ServerUpdateAPIView, ServerDeleteAPIView, ChannelCreateAPIView, ChannelUpdateAPIView, ChannelDeleteAPIView


urlpatterns = [
    path('server-details/<int:pk>/',
         ServerDetailAPIView.as_view(), name='server-detail'),

    path('servers/create/', ServerCreateView.as_view(), name='server-create'),
    path('servers/update/<int:pk>/',
         ServerUpdateAPIView.as_view(), name='server-update'),
    path('servers/delete/<int:pk>/',
         ServerDeleteAPIView.as_view(), name='server-delete'),

    path('channels/create/',
         ChannelCreateAPIView.as_view(), name='channel-create'),
    path('channels/update/<int:pk>/',
         ChannelUpdateAPIView.as_view(), name='channel-update'),
    path('channels/delete/<int:pk>/',
         ChannelDeleteAPIView.as_view(), name='channel-delete'),

    # path('roles/create/', RoleCreateAPIView.as_view(), name='role-create'),
    # path('roles/update/<int:pk>/', RoleUpdateAPIView.as_view(), name='role-update'),
    # path('roles/delete/<int:pk>/', RoleDeleteAPIView.as_view(), name='role-delete'),
]
