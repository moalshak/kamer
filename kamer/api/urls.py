from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('', views.api_home_page, name='home'),
    path('id/<str:externalId>/', views.property_by_id, name="byId"),
    path('city/<str:city>/', views.get_propertyByCityPreferences, name="byCity"),
    path('location/', views.get_propertyByLocation, name="byLocation"),
    path('city/stats/<str:city>/', views.stats, name="getStats")
]
urlpatterns = format_suffix_patterns(urlpatterns)

