from rest_framework import serializers

from .models import FriendRequest, Friendship

class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = '__all__'
        

        
class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'
        
