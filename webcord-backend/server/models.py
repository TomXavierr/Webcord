from django.db import models
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.crypto import get_random_string
from django.core.exceptions import ValidationError
from django.utils import timezone


def server_icon_upload_path(instance, filename):
    return f"server/{instance.id}/server_icon/{filename}"


class Server(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="server_owner")
    creation_date = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=250, null=True, blank=True)
    member = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="servers", through='ServerMember')
    icon = models.FileField(
        upload_to=server_icon_upload_path, null=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.id:
            existing = get_object_or_404(Server, id=self.id)
            if existing.icon and existing.icon != self.icon:

                existing.icon.delete(save=False)

        super().save(*args, **kwargs)

    def channels(self):
        return Channel.objects.filter(server=self)

    def roles(self):
        return Role.objects.filter(server=self)

    def generate_invitation(self, sender):
        invitation = Invitation.objects.create(sender=sender, server=self)
        return invitation


class Channel(models.Model):
    name = models.CharField(max_length=30)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channel_server")
    topic = models.CharField(max_length=50, null=True)

    def save(self, *args, **kwargs):
        self.name = self.name.lower()

        existing_channel = Channel.objects.filter(
            server=self.server, name=self.name).exclude(id=self.id)

        if existing_channel.exists():
            raise ValidationError(
                'A channel with the same name already exists in this server.')

        super(Channel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class ServerMember(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    join_date = models.DateField(auto_now_add=True)
    role = models.ManyToManyField('Role')

    def get_role_names(self):
        return self.role.values_list('name', flat=True)

    def __str__(self):
        return f'{self.user.username} in {self.server.name}'


class Role(models.Model):
    name = models.CharField(max_length=50)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    mentionable = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Invitation(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="invitations_sent")
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="invitations_received")
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name="invitations")
    token = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_accepted = models.BooleanField(default=False)

    def __str__(self):
        return f'Invitation from {self.sender.username} to {self.receiver.username} for server {self.server.name}'

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = get_random_string(length=20)

        # Set an expiration date, e.g., one week from the current date
        if not self.expires_at:
            self.expires_at = timezone.now() + timezone.timedelta(days=7)

        super().save(*args, **kwargs)
    

@receiver(post_save, sender=Server)
def create_server_member_and_role(sender, instance, created, **kwargs):
    if created:
        try:
            member_role = Role.objects.create(
                name="member",
                server=instance
            )
            server_member = ServerMember.objects.create(
                user=instance.owner, server=instance)

            server_member.role.add(member_role)

            default_channel = Channel.objects.create(
                name="default",
                server=instance
            )
        except Exception as e:
            print(f"Error creating 'member' role: {e}")

@receiver(post_save, sender=ServerMember)
def assign_member_role(sender, instance, created, **kwargs):
    if created:
        try:
            """Get or create the 'member' role for the server"""
            member_role, created = Role.objects.get_or_create(
                name="member",
                server=instance.server
            )

            """Assign the 'member' role to the ServerMember instance"""
            instance.role.add(member_role)
        except Exception as e:
            print(f"Error assigning 'member' role: {e}")