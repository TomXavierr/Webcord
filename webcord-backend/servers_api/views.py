from rest_framework import decorators, permissions, response, status, viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Channel, Role, Server, ServerMember
from .serializers import (ChannelSerializer, ServerMemberSerializer,
                          ServerSerializer, UserServerSerializer)


class UserServerViewSet(viewsets.ModelViewSet):
    serializer_class = UserServerSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ServerMember.objects.all()

    @action(detail=False, methods=['GET'])
    def user_servers(self, request):
        user = request.user
        server_memberships = ServerMember.objects.filter(user=user)
        serializer = UserServerSerializer(server_memberships, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ServerDetailsAPIView(RetrieveAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    lookup_field = 'id'  # This should match the field used in the URL path

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        channels = instance.channel_server.all()
        server_members = ServerMember.objects.filter(server=instance)

        server_serializer = ServerSerializer(instance, context={'request': request})
        channel_serializer = ChannelSerializer(channels, many=True, context={'request': request})
        server_member_serializer = ServerMemberSerializer(server_members, many=True, context={'request': request})

        data = {
            'server': server_serializer.data,
            'channels': channel_serializer.data,
            'server_members': server_member_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)
