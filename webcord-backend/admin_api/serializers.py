from rest_framework import serializers
from accounts.models import UserAccount


class AdminLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True)

    class Meta:
        model = UserAccount
        fields = ("email", "password")


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = "__all__"