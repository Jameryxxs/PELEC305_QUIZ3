"""
URL configuration for quiz3 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.views.generic.base import RedirectView
from django.http import HttpResponse

def home_view(request):
    return HttpResponse('<h1>Task Management API</h1><p>The API is running! Access the tasks at <a href="/api/tasks/">/api/tasks/</a></p>')

urlpatterns = [
    path('', home_view),
    path('admin/', admin.site.urls),
    path('api/', include('management.urls')),
    path('favicon.ico', RedirectView.as_view(url='/static/favicon.ico')),
]
