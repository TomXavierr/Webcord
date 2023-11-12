from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Server, Channel, Role
from .serializers import ServerDetailSerializer, ChannelSerializer, RoleSerializer


class ServerDetailAPIView(generics.RetrieveAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerDetailSerializer


class ServerCreateAPIView(generics.CreateAPIView):
    serializer_class = ServerDetailSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Set the owner to the user making the request
        serializer.save(owner=self.request.user)

        # Create a default channel for the server
        default_channel_data = {
            "name": "default",
            "server": serializer.instance.id,
            "topic": "Default channel topic"  # Add a default topic if needed
        }
        channel_serializer = ChannelSerializer(data=default_channel_data)
        if channel_serializer.is_valid():
            channel_serializer.save()

        # Add the user as the default member with the 'member' role
        server_member_data = {
            "user": self.request.user.id,
            "server": serializer.instance.id
        }
        server_member_serializer = ServerMemberSerializer(data=server_member_data)
        if server_member_serializer.is_valid():
            server_member = server_member_serializer.save()

            # Add the 'member' role to the default member
            member_role = Role.objects.get(name="member", server=serializer.instance)
            server_member.role.add(member_role)

        # You can customize the response as needed
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ServerUpdateAPIView(generics.UpdateAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerDetailSerializer
    permission_classes = [IsAuthenticated]


class ServerDeleteAPIView(generics.DestroyAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerDetailSerializer
    permission_classes = [IsAuthenticated]


# Channel API Views
class ChannelCreateAPIView(generics.CreateAPIView):
    serializer_class = ChannelSerializer
    permission_classes = [IsAuthenticated]


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
