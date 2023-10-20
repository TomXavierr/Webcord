from rest_framework import generics, status
from rest_framework.generics import UpdateAPIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (ChangePasswordSerializer, UserSerializer,
                          UserUpdateSerializer)


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
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        # Get the previous avatar before updating
        previous_avatar = self.get_object().avatar

        # Delete the previous avatar if it exists
        if previous_avatar and previous_avatar != serializer.validated_data.get('avatar'):
            previous_avatar.delete()

        # Call the superclass method to perform the update
        super().perform_update(serializer)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = self.request.user
        current_password = serializer.validated_data['current_password']
        new_password = serializer.validated_data['new_password']
        confirm_password = serializer.validated_data['confirm_password']

        if not user.check_password(current_password):
            return Response({'error': 'current_password error', 'detail': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({'error': 'confirm_password error', 'detail': 'New password and confirm password do not match.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({'detail': 'Password successfully changed.'}, status=status.HTTP_200_OK)
