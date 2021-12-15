from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('addProperty/', views.add_property, name='addProp'),
    path('<str:externalId>/', views.property_by_id),
    path('pref/<str:city>/', views.get_propertyByCityPreferences),
    path('by/location/', views.get_propertyByLocation),
    path('stats/<str:city>/', views.stats, name="getStats")
]
urlpatterns = format_suffix_patterns(urlpatterns)

