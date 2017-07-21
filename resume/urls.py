# -*- coding: utf-8 -*-
from django.conf.urls import url

from . import views

urlpatterns=[
             url(r'^$',views.index,name='index'),
            
             #url(r'^media/(?P<path>.*)','django.views.static.serve',{'document_root':'/var/www/media'}), 
             ]