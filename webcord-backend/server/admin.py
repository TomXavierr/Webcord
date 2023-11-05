from django.contrib import admin

from .models import Channel, Role, Server, ServerMember


class ServerMemberInline(admin.TabularInline):  
    model = ServerMember
    extra = 1  


@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'creation_date')
    inlines = [ServerMemberInline]


@admin.register(ServerMember)
class ServerMemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'server', 'get_roles')

    def get_roles(self, obj):
        return ', '.join([role.name for role in obj.role.all()])

    get_roles.short_description = 'Roles'



# admin.site.register(Server)
admin.site.register(Channel)
# admin.site.register(ServerMember)
admin.site.register(Role)
