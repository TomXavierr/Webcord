from django.db import models
from django.conf import settings
from django.shortcuts import get_object_or_404


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
        is_new_server = self._state.adding
        if is_new_server:
            # Create the server first
            super().save(*args, **kwargs)

            # Create a 'member' role for the new server
            try:
                member_role = Role.objects.create(
                    name="member",
                    server=self
                )

                # Assign the "member" role to the owner (creator)
                server_member = ServerMember.objects.create(
                    user=self.owner, server=self)
                server_member.role.add(member_role)
            except Exception as e:
                # Handle any exceptions that might occur during role creation
                print(f"Error creating 'member' role: {e}")

        # Handle updating of the icon
        if self.id:
            existing = get_object_or_404(Server, id=self.id)
            if existing.icon and existing.icon != self.icon:
                # Delete the old icon
                existing.icon.delete(save=False)

        super().save(*args, **kwargs)
    # def save(self, *args, **kwargs):
    #     is_new_server = self._state.adding
    #     # super(Server, self).save(*args, **kwargs)

    #     if is_new_server:
    #         # Create the server first
    #         super(Server, self).save(*args, **kwargs)

    #         # Create a 'member' role for the new server
    #         member_role = Role.objects.create(
    #             name="member",
    #             server=self
    #         )

    #         # Assign the "member" role to the owner (creator)
    #         server_member = ServerMember.objects.create(user=self.owner, server=self)
    #         server_member.role.add(member_role)

    #     if self.id:
    #         existing = get_object_or_404(Server, id=self.id)
    #         if existing.icon != self.icon:
    #             existing.icon.delete(save=False)
    #     super(Server, self).save(*args, **kwargs)

    def channels(self):
        # Use the reverse relationship to get all channels for the server
        return Channel.objects.filter(server=self)

    def roles(self):
        return Role.objects.filter(server=self)


class Channel(models.Model):
    name = models.CharField(max_length=30)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channel_server")
    topic = models.CharField(max_length=50, null=True)

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Channel, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class ServerMember(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
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
