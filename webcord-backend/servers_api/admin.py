from django.contrib import admin

from .models import Server, ServerMember, Role, Channel, UserRole

# Register your models here.
admin.site.register(Server)
admin.site.register(ServerMember)
admin.site.register(Channel)
admin.site.register(Role)
admin.site.register(UserRole)
