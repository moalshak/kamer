from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

app_name = "users"
# localhost/api/register
urlpatterns = [
    path('', views.registration_view, name='api_register'),
]

