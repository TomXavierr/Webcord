from django.db import models
from django.conf import settings 
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
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    date_joined	= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    is_banned = models.BooleanField(default=False, blank=True, null=True)
    is_admin        = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
   

    REQUIRED_FIELDS = ['username','display_name']
    USERNAME_FIELD = 'email'

    objects = UserAccountManager()

    def get_displayname(self):
        return self.display_name
    
    def __str__(self):
        return self.email
    


class FriendList(models.Model):
    user    = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user")
    friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="friends")

    def __str__(self):
        return self.user.username

    def add_friend(self, account):
        if not account in self.friends.all():
            self.friends.add(account)
            self.save()

    def remove_friend(self,account):
        if account in self.friends.all():
            self.friends.remove(account)

    def unfriend(self, remove):
        remove_friends_list = self

        remover_friends_list.remove_friend(removee)

        friends_list = FriendList.objects.get(user = remove)
        friends_list.remove_friend(self.user)

    def is_mutual_friend(self, friend):
        if friend in self.friends.all():
            return True
        return False


class FriendRequest(models.Model):
    sender     = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sender")
    receiver   = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="receiver")

    is_active  = models.BooleanField(blank=True, null=False, default=True)

    timestamp  = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.sender.username
    
    def accept(self):
        receiver_friend_list = FriendList.objects.get(user = self.receiver)
        if receiver_friend_list:
            receiver_friend_list.add_friend(self.sender)
            sender_friend_list = FriendList.objects.get(user = self.sender)
            if sender_friend_list:
                sender_friend_list.add_friend(self.receiver)
                self.is_active = False
                self.save()

    def decline(self):
        self.is_active = False
        self.save()

    def cancel(self):
        self.is_active = False
        self.save()

            