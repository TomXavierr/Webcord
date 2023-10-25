"""Models for servers and related objects """
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


class Server(models.Model):
    """Server model"""
    server_name = models.CharField(max_length=100)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    server_icon = models.ImageField(
        upload_to='server-icons', blank=True, null=True)

    def __str__(self):
        return self.server_name


@receiver(post_save, sender=Server)
def create_default_roles_and_assign_owner(sender, instance, created, **kwargs):
    if created:
        # Create the "member" role
        member_role = Role.objects.create(
            server=instance,
            role_name="member",
            position=10,
        )

        # Create the "owner" role
        owner_role = Role.objects.create(
            server=instance,
            role_name="owner",
            position=0,
        )

        # Create the first server member and assign the owner role
        server_member = ServerMember.objects.create(
            server=instance,
            user=instance.owner,
        )

        # Assign roles to the user's assigned_roles
        server_member.assigned_roles.add(owner_role, member_role)


class Role(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    role_name = models.CharField(max_length=50)
    color = models.CharField(max_length=50, null=True, blank=True)
    position = models.PositiveIntegerField()
    mentionable = models.BooleanField(default=True)
    users = models.ManyToManyField(get_user_model(), related_name='roles')

    def __str__(self):
        return self.role_name


class ServerMember(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    join_date = models.DateTimeField(auto_now_add=True)
    assigned_roles = models.ManyToManyField(Role, related_name='server_members')  # Many-to-many relationship

    def __str__(self):
        return f'{self.user.username} - {self.server.server_name}'


class Channel(models.Model):
    channel_name = models.CharField(max_length=50)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channel_server")
    channel_type = models.CharField(max_length=10)
    position = models.PositiveIntegerField()
    topic = models.CharField(max_length=100)
    last_message_timestamp = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.channel_name = self.channel_name.lower()
        super(Channel, self).save(*args, **kwargs)

    def __str__(self):
        return self.channel_name
