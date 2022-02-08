from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token


from . import views

app_name = "users"
# localhost/api/log/*
urlpatterns = [
    path('reg/', views.registration_view, name='api_register_'),
    # generates a token upon successful login
    path('in/', obtain_auth_token, name='api_login')
]

