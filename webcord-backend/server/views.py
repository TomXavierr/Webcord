from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Server
from .serializers import ServerDetailSerializer


class ServerDetailAPIView(generics.RetrieveAPIView):
    queryset = Server.objects.all()
    serializer_class = ServerDetailSerializer



