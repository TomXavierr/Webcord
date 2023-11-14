from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .models import Server, Channel, Role
from .serializers import ServerDetailSerializer, ChannelSerializer, RoleSerializer, ServerSerializer, ServerUpdateSerializer


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
