from accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import FriendRequest, Friendship
from .serializers import (
    FriendRequestSerializer,
    UserSearchSerializer
    )


class FriendRequestViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    @action(detail=False, methods=['GET'])
    def friend_requests_list(self, request):
        user = request.user
        friend_requests = FriendRequest.objects.filter(
            receiver=user, status='pending')
        serializer = FriendRequestSerializer(friend_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        sender = request.data.get('sender')
        receiver = request.data.get('receiver')
        existing_request_from_receiver = FriendRequest.objects.filter(
            sender=receiver, receiver=sender).first()
        if existing_request_from_receiver and existing_request_from_receiver.status == FriendRequest.PENDING:
            return Response({'detail': "The other user has already sent a friend request to you. \
                You can accept or decline it."}, status=status.HTTP_400_BAD_REQUEST)

        existing_request = FriendRequest.objects.filter(
            sender=sender, receiver=receiver).first()
        if existing_request:
            if existing_request.status == FriendRequest.PENDING:
                return Response({'detail': 'Friend request already exists'}, status=status.HTTP_400_BAD_REQUEST)
            elif existing_request.status == FriendRequest.DECLINED:
                existing_request.status = FriendRequest.PENDING
                existing_request.save()
                return Response({'detail': 'Friend request sent again'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': "You're already friends "}, status=status.HTTP_200_OK)

        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['POST'])
    def accept(self, request, pk=None):
        friend_request = self.get_object()
        friend_request.status = FriendRequest.ACCEPTED
        friend_request.save()

        existing_friendship = Friendship.objects.filter(
            sender=friend_request.sender, receiver=friend_request.receiver).first()
        if existing_friendship:
            existing_friendship.is_accepted = True
            existing_friendship.save()

        return Response({'detail': 'Friend request accepted'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def decline(self, request, pk=None):
        friend_request = self.get_object()
        friend_request.status = FriendRequest.DECLINED
        friend_request.save()
        return Response({'detail': 'Friend request declined'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def cancel_request(self, request, pk=None):
        friend_request = self.get_object()

        if friend_request.sender != request.user:
            return Response(
                {'detail': 'You do not have permission to cancel this request'}, status=status.HTTP_403_FORBIDDEN
                )
        if friend_request.status != FriendRequest.PENDING:
            return Response(
                {'detail': 'Cannot cancel a request that is not pending'}, status=status.HTTP_400_BAD_REQUEST)
        friend_request.delete()

        return Response({'detail': 'Friend request canceled'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def friends_list(self, request):
        user = request.user
        friends = user.get_friends()
        # Replace YourUserAccountSerializer with your actual serializer
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def user_search(self, request):
        user = request.user
        query = request.GET.get('query', '')

        users = get_user_model().objects.filter(
            ~Q(is_staff=True) & ~Q(is_banned=True)
        ).exclude(id=user.id)

        if query:
            users = users.filter(
                Q(username__icontains=query) |
                Q(display_name__icontains=query)
            )

        serializer = UserSearchSerializer(
            users, many=True, context={'request_user': user})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def remove_friend(self, request):
        friend_user_id = request.data.get('friend_user_id')

        if not friend_user_id:
            return Response({'detail': 'Friend user ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        friendship = Friendship.objects.filter(
            Q(sender=request.user, receiver_id=friend_user_id) |
            Q(sender_id=friend_user_id, receiver=request.user),
            is_accepted=True
        ).first()

        if not friendship:
            return Response({'detail': 'Friendship not found'}, status=status.HTTP_404_NOT_FOUND)

        # Remove the friendship
        friendship.delete()

        friend_request = FriendRequest.objects.filter(
            Q(sender=request.user, receiver_id=friend_user_id) |
            Q(sender_id=friend_user_id, receiver=request.user),
            status=FriendRequest.ACCEPTED
        ).first()

        if friend_request:
            friend_request.delete()

        return Response({'detail': 'Friend removed successfully'}, status=status.HTTP_200_OK)
