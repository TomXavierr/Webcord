from rest_framework import serializers
from .models import ServerMember, Channel, Server
from accounts.models import UserAccount


class UserServerSerializer(serializers.ModelSerializer):
    server = serializers.SerializerMethodField()

    class Meta:
        model = ServerMember
        fields = ('server', 'join_date', 'assigned_roles')

    def get_server(self, obj):
        server = obj.server
        server_icon_url = server.server_icon.url if server.server_icon else None
        return {
            'id': server.id,
            'server_name': server.server_name,
            'server_icon': server_icon_url
        }


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class ServerMemberSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='username', queryset=UserAccount.objects.all())  # Replace 'User' with the actual user model
    server = serializers.SlugRelatedField(
        slug_field='server_name', queryset=Server.objects.all())
    assigned_roles = serializers.SerializerMethodField()

    class Meta:
        model = ServerMember
        fields = '__all__'

    def get_assigned_roles(self, obj):
        role_names = [role.role_name for role in obj.assigned_roles.all()]
        return role_names


class ServerSerializer(serializers.ModelSerializer):
    channels = ChannelSerializer(many=True, read_only=True)
    members = ServerMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Server
        fields = '__all__'
