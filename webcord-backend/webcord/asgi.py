import os

# from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'webcord.settings')

django_application = get_asgi_application()

from . import urls  # noqa isort:skip
from webchat.middleware import TokenAuthMiddleware # noqa isort:skip

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": TokenAuthMiddleware(
            URLRouter(urls.websocket_urlpatterns)
        )
    }
)


# application = get_asgi_application()
