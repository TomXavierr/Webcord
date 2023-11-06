from accounts.models import UserAccount
from rest_framework import serializers


from .models import Channel, Role, Server, ServerMember


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'username', 'display_name', 'avatar']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Remove the base URL prefix from the avatar URL
        if 'avatar' in data and data['avatar']:
            data['avatar'] = data['avatar'].replace(
                "http://127.0.0.1:8000", "")
        return data


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
    channels = ChannelSerializer(many=True, source='channel_server')
    members = ServerMemberSerializer(many=True, source='servermember_set')

    class Meta:
        model = Server
        fields = '__all__'
