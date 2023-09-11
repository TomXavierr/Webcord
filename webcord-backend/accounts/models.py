from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db.models import Q

# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self,email,username,display_name ,password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        
        if not display_name:
            raise ValueError('Users must have a Display Name')
        
        email = self.normalize_email(email)
        user = self.model(email = email,display_name = display_name, username = username )
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,email, username,display_name, password):
        user = self.create_user(
            email    =  self.normalize_email(email),
            username = username,
            display_name = display_name,
            password = password
        )

        user.is_admin     = True
        user.is_staff     = True
        user.is_superuser = True
        user.save(using = self._db)
        return user
    


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    display_name = models.CharField(max_length=255)
    registration_date = models.DateField(auto_now_add=True)
    avatar = models.ImageField(upload_to='useravatar', blank=True, null=True)
    banner = models.ImageField(upload_to='userbanner', blank=True, null=True)
    status = models.TextField(blank=True)
    about = models.TextField(blank=True)
    phone = models.CharField(max_length=15, blank=True)
    last_login = models.DateTimeField(blank=True, null=True)
    is_banned = models.BooleanField(default=False, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    friends = models.ManyToManyField(
        'self', through='Friendship', symmetrical=False, related_name='related_friends'
    )


    REQUIRED_FIELDS = ['username','display_name']
    USERNAME_FIELD = 'email'

    objects = UserAccountManager()

    def get_displayname(self):
        return self.display_name
    
    def __str__(self):
        return self.email
    
    
    def send_friend_request(self, receiver):
        if not Friendship.objects.filter(sender=self, receiver=receiver).exists():
            Friendship.objects.create(sender=self, receiver=receiver, status='pending')

    def accept_friend_request(self, sender):
        friendship = Friendship.objects.get(sender=sender, receiver=self, status='pending')
        friendship.status = 'accepted'
        friendship.save()

    def get_friends(self):
        return UserAccount.objects.filter(
            Q(sent_friend_requests__receiver=self, sent_friend_requests__status='accepted') |
            Q(received_friend_requests__sender=self, received_friend_requests__status='accepted')
        ).distinct()



class Friendship(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )

    sender = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='sent_friend_requests'
    )
    receiver = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='received_friend_requests'
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('sender', 'receiver')

    def __str__(self):
        return f'{self.sender} to {self.receiver}: {self.status}'