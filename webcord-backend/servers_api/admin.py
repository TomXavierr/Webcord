from django.contrib import admin

from .models import Channel, Role, Server, ServerMember

# Register your models here.
admin.site.register(Server)
# admin.site.register(ServerMember)
admin.site.register(Channel)
admin.site.register(Role)


class ServerMemberAdmin(admin.ModelAdmin):
    filter_horizontal = ('assigned_roles',)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "assigned_roles":
            # Get the selected server from the request
            server_member_id = request.resolver_match.kwargs.get('object_id')
            if server_member_id:
                try:
                    server_member = ServerMember.objects.get(pk=server_member_id)
                    # Filter roles based on the server associated with the server member
                    kwargs["queryset"] = Role.objects.filter(server=server_member.server)
                except ServerMember.DoesNotExist:
                    pass
        return super().formfield_for_manytomany(db_field, request, **kwargs)


admin.site.register(ServerMember, ServerMemberAdmin)
