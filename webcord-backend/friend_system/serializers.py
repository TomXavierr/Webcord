from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FriendRequest, Friendship
from django.db.models import Q


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = '__all__'


class UserSearchSerializer(serializers.ModelSerializer):
    is_friend = serializers.SerializerMethodField()
    is_friend_request_sent = serializers.SerializerMethodField()
    friend_request_id = serializers.SerializerMethodField()
    friend_request_status = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = [
            'id', 'username', 'display_name', 'avatar', 'is_friend', 'is_friend_request_sent',
            'friend_request_id', 'friend_request_status']

    def get_is_friend(self, obj):
        request_user = self.context.get('request_user')
        return Friendship.objects.filter(
            Q(sender=request_user, receiver=obj) | Q(sender=obj, receiver=request_user),
            is_accepted=True
        ).exists()

    def get_is_friend_request_sent(self, obj):
        request_user = self.context.get('request_user')
        return FriendRequest.objects.filter(sender=request_user, receiver=obj).exists()

    def get_friend_request_id(self, obj):
        request_user = self.context.get('request_user')
        friend_request = FriendRequest.objects.filter(
            sender=request_user, receiver=obj, status=FriendRequest.PENDING).first()
        return friend_request.id if friend_request and friend_request.status == FriendRequest.PENDING else None

    def get_friend_request_status(self, obj):
        request_user = self.context.get('request_user')
        friend_request = FriendRequest.objects.filter(sender=request_user, receiver=obj).first()
        return friend_request.status if friend_request else None


class FriendRequestSerializer(serializers.ModelSerializer):
    sender_details = UserSearchSerializer(source='sender', read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'status', 'created_at', 'sender', 'receiver', 'sender_details']
