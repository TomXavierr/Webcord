from django.contrib.auth import get_user_model
# from django.urls import reverse
from djoser.serializers import UserCreateSerializer as BaseUSerCreateSerializer
# from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(BaseUSerCreateSerializer):
    class Meta(BaseUSerCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'display_name', 'username', 'password')


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'display_name', 'username',
                  'status', 'about', 'phone', 'avatar','banner')


class UserUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    display_name = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['username', 'display_name',
                  'status', 'about', 'phone', 'avatar', 'banner']


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
