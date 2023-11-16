from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated 
from rest_framework.exceptions import PermissionDenied
from rest_framework import serializers

from .models import Server, Channel, Role, Invitation
from .serializers import ServerDetailSerializer, ChannelSerializer, RoleSerializer, ServerSerializer, ServerUpdateSerializer, InvitationSerializer


class ServerDetailAPIView(generics.RetrieveAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerDetailSerializer


class ServerCreateView(generics.CreateAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ServerUpdateAPIView(generics.UpdateAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerUpdateSerializer
    permission_classes = [IsAuthenticated]


class ServerDeleteAPIView(generics.DestroyAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        server_id = kwargs.get('pk')
        instance = get_object_or_404(Server, id=server_id)

        if request.user == instance.owner:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "You do not have permission to delete this server."},
                            status=status.HTTP_403_FORBIDDEN)


class ChannelCreateAPIView(generics.CreateAPIView):
    serializer_class = ChannelSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        server_id = self.request.data.get('server')
        print(server_id)
        server = get_object_or_404(Server, id=server_id)

        if server.owner != self.request.user:
            raise PermissionDenied("You are not the owner of this server.")

        serializer.save(server=server)


class ChannelUpdateAPIView(generics.UpdateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = [IsAuthenticated]


class ChannelDeleteAPIView(generics.DestroyAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = [IsAuthenticated]


# Role API Views
class RoleCreateAPIView(generics.CreateAPIView):
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]


class RoleUpdateAPIView(generics.UpdateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]


class RoleDeleteAPIView(generics.DestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAuthenticated]


class CreateInviteAPIView(generics.CreateAPIView):
    serializer_class = InvitationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        server_id = self.kwargs.get('server_id')
        server = get_object_or_404(Server, id=server_id)

        # Check if the current user is the owner of the server
        if server.owner != self.request.user:
            raise PermissionDenied("You are not the owner of this server.")

        serializer.save(sender=self.request.user, server=server)


class AcceptInviteAPIView(generics.UpdateAPIView):
    serializer_class = InvitationSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        token = self.kwargs.get('token')
        invitation = get_object_or_404(Invitation, token=token)

        user = self.request.user

        if invitation.server.servermember_set.filter(user=user).exists():
            raise serializers.ValidationError(
                "You are already a member of this server.")

        # Add the user to the server
        server_member = invitation.server.servermember_set.create(user=user)
        invitation.delete()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)

        # Retrieve the invitation object again using the token
        token = kwargs.get('token')
        invitation = get_object_or_404(Invitation, token=token)

        serializer = self.get_serializer(
            invitation, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response({'detail': f'You have successfully joined {invitation.server.name}.'}, status=200)
