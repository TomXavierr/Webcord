from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Channel, Server, ServerMember


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class MemberDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'display_name', 'username',
                  'status', 'avatar']


class ServerMemberSerializer(serializers.ModelSerializer):
    user = MemberDetailsSerializer()
    assigned_roles = serializers.SerializerMethodField()

    class Meta:
        model = ServerMember
        fields = '__all__'

    def get_assigned_roles(self, obj):
        role_names = [role.role_name for role in obj.assigned_roles.all()]
        return role_names


class ServerSerializer(serializers.ModelSerializer):
    member_count = serializers.SerializerMethodField()
    # channel_server = ChannelSerializer()
    # server_members = ServerMemberSerializer()

    class Meta:
        model = Server
        fields = '__all__'

    def get_member_count(self, obj):
        return ServerMember.objects.filter(server=obj).count()
