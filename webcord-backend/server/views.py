from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist

from .models import Server, Channel, Role, Invitation, ServerMember
from .serializers import ServerDetailSerializer, ChannelSerializer, RoleSerializer, ServerSerializer, ServerUpdateSerializer, InvitationSerializer, InvitationListSerializer


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


class ReceivedInvitationsView(generics.ListAPIView):
    serializer_class = InvitationListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Invitation.objects.filter(receiver=user, is_accepted=False).select_related('server', 'sender')


class SendInvitationView(generics.CreateAPIView):
    queryset = Invitation.objects.all()
    serializer_class = InvitationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        sender = self.request.user
        serializer.save(sender=sender)
        
    

class AcceptInvitationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, token):
        try:
            invitation = Invitation.objects.get(
                token=token, receiver=request.user, is_accepted=False)

            server = invitation.server
            server_member = ServerMember.objects.create(
                user=request.user, server=server)
            if server_member:
                invitation.is_accepted = True
                invitation.delete()

            return Response({'message': 'Invitation accepted successfully.'})

        except ObjectDoesNotExist:
            return Response({'error': 'Invalid invitation token or invitation already accepted.'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': f'Error accepting invitation: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LeaveServerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, server_id):
        server = get_object_or_404(Server, id=server_id)
        server_member = get_object_or_404(ServerMember, user=request.user, server=server)

        if server.owner == request.user:
            return Response({'detail': 'Server owner cannot leave the server.'}, status=status.HTTP_400_BAD_REQUEST)

        server_member.delete()

        return Response({'detail': 'You have left the server successfully.'}, status=status.HTTP_200_OK)

        
class ChannelCreateAPIView(generics.CreateAPIView):
    serializer_class = ChannelSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        server_id = self.request.data.get('server')
        print(server_id)
        server = get_object_or_404(Server, id=server_id)

        if server.owner != self.request.user:
            raise PermissionDenied("You are not the owner of this server.")

        try:
            serializer.save(server=server)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ChannelUpdateAPIView(generics.UpdateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = [IsAuthenticated]


class ChannelDeleteAPIView(generics.DestroyAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        channel_id = kwargs.get('pk')
        channel = get_object_or_404(Channel, id=channel_id)
        server = channel.server

        if request.user == server.owner:
            channel.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "You do not have permission to delete this channel."},
                            status=status.HTTP_403_FORBIDDEN)


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
