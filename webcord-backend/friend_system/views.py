from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Friendship,FriendRequest
from .serializers import FriendRequestSerializer, FriendshipSerializer
from accounts.serializers import UserSerializer

class FriendRequestViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    @action(detail=False, methods=['GET'])
    def friend_requests_list(self, request):
        user = request.user
        friend_requests = FriendRequest.objects.filter(receiver=user.id)
        serializer = FriendRequestSerializer(friend_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def create(self, request, *args, **kwargs):
        sender = request.data.get('sender')
        receiver = request.data.get('receiver')
        existing_request = FriendRequest.objects.filter(sender=sender, receiver=receiver).first()
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

        existing_friendship = Friendship.objects.filter(sender=friend_request.sender, receiver=friend_request.receiver).first()
        if existing_friendship:
            existing_friendship.is_accepted = True
            existing_friendship.save()

        return Response({'detail': 'Friend request accepted'},status=status.HTTP_200_OK)

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
            return Response({'detail': 'You do not have permission to cancel this request'}, status=status.HTTP_403_FORBIDDEN)
        if friend_request.status != FriendRequest.PENDING:
            return Response({'detail': 'Cannot cancel a request that is not pending'}, status=status.HTTP_400_BAD_REQUEST)
        friend_request.delete()

        return Response({'detail': 'Friend request canceled'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def friends_list(self, request):
        user = request.user
        friends = user.get_friends()
        serializer = UserSerializer(friends, many=True)  # Replace YourUserAccountSerializer with your actual serializer
        return Response(serializer.data, status=status.HTTP_200_OK)