"""Models for servers and related objects """
from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Server(models.Model):
    """Server model"""
    server_name = models.CharField(max_length=100)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    server_icon = models.ImageField(upload_to='useravatar', blank=True, null=True)

    def __str__(self):
        return self.server_name

class Role(models.Model):
    server_id = models.ForeignKey(Server, on_delete=models.CASCADE)
    role_name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    positon = models.PositiveIntegerField()
    mentionable = models.BooleanField(default=True)

class ServerMember(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    join_date = models.DateTimeField(auto_now_add=True)
    roles = models.ManyToManyField(Role, through='UserRole')  # Many-to-many relationship

class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    
class Channel(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    channel_name = models.CharField(max_length=50)
    channel_type = models.CharField(max_length=10)  # "text", "voice", etc.
    position = models.PositiveIntegerField()
    topic = models.TextField(null=True, blank=True)
    last_message_timestamp = models.DateTimeField(null=True, blank=True)