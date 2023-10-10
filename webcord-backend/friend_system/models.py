from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Friendship(models.Model):
    sender =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sender')
    receiver =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiver')
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class FriendRequest(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DECLINED = 'declined'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (DECLINED, 'Declined'),
    ]

    sender =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='friend_request_sender')
    receiver =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='friend_request_receiver')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     # Add a unique constraint to ensure only one active friend request between sender and receiver
    #     unique_together = ['sender', 'receiver']


@receiver(post_save, sender=FriendRequest)
def create_friendship_on_request(sender, instance, **kwargs):
    if instance.status == FriendRequest.ACCEPTED:
        Friendship.objects.get_or_create(sender=instance.sender, receiver=instance.receiver, defaults={'is_accepted': True})