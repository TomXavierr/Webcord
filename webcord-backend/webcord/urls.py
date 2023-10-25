
from accounts.views import CustomTokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView,
                                   SpectacularSwaggerView)
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)

urlpatterns = [

    path('dj-admin/', admin.site.urls),
    path('admin/', include('admin_api.urls')),
    path('account/', include('accounts.urls')),
    path('friends/', include('friend_system.urls')),
    path('server-api/', include('servers_api.urls')),


    path('api-auth/', include('rest_framework.urls')),
    path('auth/token/create/', CustomTokenObtainPairView.as_view(),
         name='custom-token-create'),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # path('auth/', include('djoser.social.urls')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/',
         SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]
