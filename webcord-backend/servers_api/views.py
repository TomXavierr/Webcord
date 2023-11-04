from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response

from .models import Server, ServerMember
from .serializers import (ChannelSerializer, ServerMemberSerializer,
                          ServerSerializer)


class ServerDetailsAPIView(RetrieveAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        """
        API view to retrieve details of a server, including channels and server members.

        This view retrieves information about a server, its associated channels, and server members.
        It uses the ServerSerializer to serialize the server information, ChannelSerializer for channels,
        and ServerMemberSerializer for server members.

        Attributes:
            queryset (QuerySet): The queryset for the Server model.
            serializer_class (Serializer): The serializer class to use for server details.
            lookup_field (str): The field used for looking up server details in the URL.

        Methods:
            retrieve(request, *args, **kwargs): Handles the HTTP GET request to retrieve server details.
                Retrieves the server, channels, and server members, serializes the data,
                and returns a response with the server's information, channels, and server members.

        Examples:
            To retrieve details for a specific server, make a GET request to the server's API endpoint.
        """
        instance = self.get_object()

        # channels = instance.channel_server.all()
        server_members = ServerMember.objects.select_related(
            'user').filter(server=instance)

        server_serializer = ServerSerializer(instance)
        channel_serializer = ChannelSerializer(
            instance.channel_server.all(), many=True)
        server_member_serializer = ServerMemberSerializer(
            server_members, many=True)

        data = {
            'server': server_serializer.data,
            'channels': channel_serializer.data,
            'server_members': server_member_serializer.data,
        }

        return Response(data, status=status.HTTP_200_OK)
