from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer as BaseUSerCreateSerializer,UserSerializer as BaseUserSerializer 
from rest_framework import serializers
from django.urls import reverse

User = get_user_model()


class UserCreateSerializer(BaseUSerCreateSerializer):
    class Meta(BaseUSerCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'display_name', 'username', 'password')

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields=['email','password']
