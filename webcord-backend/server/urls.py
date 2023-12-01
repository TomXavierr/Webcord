from django.urls import path
from .views import ServerDetailAPIView, ServerCreateView, ServerUpdateAPIView, ServerDeleteAPIView, ChannelCreateAPIView, ChannelUpdateAPIView, ChannelDeleteAPIView, SendInvitationView, AcceptInvitationView, ReceivedInvitationsView, LeaveServerView


urlpatterns = [
    path('server-details/<int:pk>/',
        ServerDetailAPIView.as_view(), name='server-detail'),

    path('servers/create/', ServerCreateView.as_view(), name='server-create'),
    path('servers/update/<int:pk>/',
        ServerUpdateAPIView.as_view(), name='server-update'),
    path('servers/delete/<int:pk>/',
        ServerDeleteAPIView.as_view(), name='server-delete'),

    path('invitations/received/', 
        ReceivedInvitationsView.as_view(), name='received-invitations'),
    path('send-invitation/', 
        SendInvitationView.as_view(), name='send-invitation'),
    path('accept-invitation/<str:token>/', 
        AcceptInvitationView.as_view(), name='accept-invitation'),
    path('<int:server_id>/leave/',
     LeaveServerView.as_view(), name='leave-server'),


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
