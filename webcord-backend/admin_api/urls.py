from django.urls import path
from . import views



urlpatterns = [

    path('admin-login/',views.AdminLoginView.as_view(), name='admin-login'),
    path('get_userlist/',views.AdminUsersListView.as_view(),name='user'),
    path('block_unblock_user/<int:user_id>',views.AdminUsersListView.as_view(),name='userban'),
]