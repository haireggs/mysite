# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    # Examples:
    #url(r'^$', 'mysite.views.home', name='home'),
    #url(r'^$', include('blog.urls')),
    url(r'^$', include('resume.urls')),
    url(r'^danima/', include('danima.urls')),
    url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
