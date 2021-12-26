from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('', views.properties, name='properties'),
    path('<str:externalId>/', views.property_by_id, name="byId"),
    path('pref/<str:city>/', views.get_propertyByCityPreferences, name="byCity"),
    path('by/location/', views.get_propertyByLocation, name="byLocation"),
    path('stats/<str:city>/', views.stats, name="getStats")
]
urlpatterns = format_suffix_patterns(urlpatterns)

