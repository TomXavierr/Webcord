
from accounts.views import CustomTokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView,
                                   SpectacularSwaggerView)
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)
from webchat.consumer import WebChatConsumer

urlpatterns = [

    path('dj-admin/', admin.site.urls),
    path('admin/', include('admin_api.urls')),
    path('account/', include('accounts.urls')),
    path('friends/', include('friend_system.urls')),
    path('server/', include('server.urls')),
    path('chats/', include('webchat.urls')),


    path('api-auth/', include('rest_framework.urls')),
    path('auth/token/create/', CustomTokenObtainPairView.as_view(),
         name='custom-token-create'),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


websocket_urlpatterns = [
    path("<str:serverId>/<str:channelId>", WebChatConsumer.as_asgi())]


# if settings.DEBUG:
#      urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
