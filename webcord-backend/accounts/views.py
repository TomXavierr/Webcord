from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer,UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from .models import UserAccount



class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
           
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.user = serializer.user 
            if self.user.is_banned:
                # User is banned, you can customize the response accordingly
                response.data = {'detail': 'This user is banned.'}
                response.status_code = status.HTTP_403_FORBIDDEN

        return response

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Check if 'avatar' and 'banner' are present in the request data
        if 'avatar' in request.data:
            instance.update_avatar(request.data['avatar'])

        if 'banner' in request.data:
            instance.update_banner(request.data['banner'])

        return Response(serializer.data)