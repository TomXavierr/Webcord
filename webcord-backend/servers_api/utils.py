from .models import ServerMember


def get_user_servers(user):
    server_memberships = ServerMember.objects.filter(user=user)
    server_data = []
    for membership in server_memberships:
        server = membership.server
        server_data.append({
            'id': server.id,
            'server_name': server.server_name,
            'server_icon': server.server_icon.url if server.server_icon else None
        })
    return server_data
