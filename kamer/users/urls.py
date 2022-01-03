from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

# localhost/log/*
urlpatterns = [
    path('reg/', views.registration_view, name='register'),
    path('in/', obtain_auth_token, name='login')
]
