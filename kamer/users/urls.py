from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

# localhost/log/*
urlpatterns = [
    path('reg/', views.registration_view, name='register'),
    path('in/', views.login_view, name='login'),
    path('out/', views.logout_view, name='logout'),
]
