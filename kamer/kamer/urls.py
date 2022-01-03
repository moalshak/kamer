"""kamer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# right now there is one admin user...
# TODO: add your own admin account by: `python manage.py createsuperuser`
# email: mo@gmail.com
# password: 123

urlpatterns = [
    # localhost/admin/
    path('admin/', admin.site.urls),
    # localhost/log/<users.urls>
    path('log/', include('users.urls')),
    # localhost/<frontend.urls>
    path('', include('frontend.urls')),
    # localhost/<api.urls>
    path('api/', include('api.urls')),
]
