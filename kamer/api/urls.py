from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


# localhost/api/*
urlpatterns = [
    path('', views.api_home_page, name='api'),
    path('log/', include('users.users_api.urls')),
    path('all/', views.PropertiesListView.as_view(), name="list"),
    path('id/<str:externalId>/', views.property_by_id, name="byId"),
    path('city/<str:city>/', views.get_propertyByCityPreferences, name="byCity"),
    path('location/', views.get_propertyByLocation, name="byLocation"),
    path('city/stats/<str:city>/', views.stats, name="getStats")
]
urlpatterns = format_suffix_patterns(urlpatterns)

