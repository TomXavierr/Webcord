from django.db import models
from django.contrib.auth import get_user_model


class Conversation(models.Model):
    channel_id = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model) :
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="message")
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField() 
    timestamp = models.DateTimeField(auto_now_add=True)


class DirectMessage(models.Model):
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="message_sender")
    reciever = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="message_reciever")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return self.sender.display_name

    def last_30_messages(self):
        return DirectMessage.objects.order_by('-timestamp').all()[:30]