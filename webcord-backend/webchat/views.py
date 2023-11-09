from rest_framework import generics
from rest_framework.response import Response
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

class ChannelChatList(generics.ListAPIView):
    serializer_class = ConversationSerializer

    def get_queryset(self):
        channel_id = self.kwargs['channel_id']
        return Conversation.objects.filter(channel_id=channel_id)

class MessageViewSet(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        channel_id = self.kwargs['channel_id']
        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            return Message.objects.filter(conversation=conversation)
        except Conversation.DoesNotExist:
            return Message.objects.none()  # Return an empty queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)