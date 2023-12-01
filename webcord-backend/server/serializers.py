from accounts.models import UserAccount
from rest_framework import serializers


from .models import Channel, Role, Server, ServerMember, Invitation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'username', 'display_name', 'avatar']

class ServerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = ['id','name','icon']

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class ServerMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    roles = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name',
        source='role'
    )

    class Meta:
        model = ServerMember
        fields = ['id', 'user', 'roles', 'join_date']


class ServerDetailSerializer(serializers.ModelSerializer):
    channels = ChannelSerializer(many=True, read_only=True)
    members = ServerMemberSerializer(many=True, source='servermember_set')
    # owner = UserSerializer(read_only=True)

    class Meta:
        model = Server
        fields = '__all__'



class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = '__all__'


class ServerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = '__all__'

class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'
        extra_kwargs = {
            'token': {'required': False},
            'expires_at': {'required': False},
        }

    def validate(self, data):
        sender = self.context['request'].user
        receiver = data.get('receiver')
        server = data.get('server')

       
        existing_invitation = Invitation.objects.filter(
            sender=sender,
            receiver=receiver,
            server=server,
            is_accepted=False
        ).first()

        if existing_invitation:
            raise serializers.ValidationError("Invitation already exists for this friend and server.")

        return data

class InvitationListSerializer(serializers.ModelSerializer):
    server = ServerProfileSerializer()
    sender = UserSerializer()

    class Meta:
        model = Invitation
        fields = ('id', 'token', 'created_at', 'expires_at', 'is_accepted', 'server', 'sender')