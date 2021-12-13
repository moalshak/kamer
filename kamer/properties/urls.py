from django.urls import path
from django.urls.conf import re_path
from django.urls.resolvers import URLPattern
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('addProperty/', views.add_property, name='addProp'),
    path('<str:externalId>/', views.property_by_id),
    path('location/', views.get_propertyByLocation),
    path('pref/<str:city>/', views.get_propertyByCityPreferences),
    path('stats/<str:city>/', views.stats, name="getStats")
]

