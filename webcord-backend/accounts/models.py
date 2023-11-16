import os
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db.models import Q
from django.shortcuts import get_object_or_404


def avatar_upload_path(instance, filename):
    return f"user/{instance.id}/avatar/{filename}"

def banner_upload_path(instance, filename):
    return f"user/{instance.id}/banner/{filename}"


class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, display_name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        if not display_name:
            raise ValueError('Users must have a Display Name')

        email = self.normalize_email(email)
        user = self.model(
            email=email, display_name=display_name, username=username)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, display_name, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            display_name=display_name,
            password=password
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    display_name = models.CharField(max_length=255)
    registration_date = models.DateField(auto_now_add=True)
    avatar = models.ImageField(upload_to=avatar_upload_path, blank=True, null=True)
    banner = models.ImageField(upload_to=banner_upload_path, blank=True, null=True)
    status = models.TextField(blank=True)
    about = models.TextField(blank=True)
    phone = models.CharField(max_length=15, blank=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    is_banned = models.BooleanField(default=False, blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['username', 'display_name']
    USERNAME_FIELD = 'email'

    objects = UserAccountManager()

    def get_displayname(self):
        return self.display_name

    def __str__(self):
        return self.email

    def get_friends(self):

        friends = UserAccount.objects.filter(
            Q(sender__receiver=self, sender__is_accepted=True) |
            Q(receiver__sender=self, receiver__is_accepted=True)
        ).distinct()

        return friends

    def save(self, *args, **kwargs):
        if self.id:
            existing = get_object_or_404(UserAccount, id=self.id)
            if existing.avatar and existing.avatar != self.avatar:
                existing.avatar.delete(save=False)
            if existing.banner and existing.banner != self.banner:
                existing.banner.delete(save=False)
        super().save(*args, **kwargs)


