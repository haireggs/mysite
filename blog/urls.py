# -*- coding: utf-8 -*-
from django.conf.urls import url

from . import views

urlpatterns=[
             url(r'^$',views.index,name='index'),
             url(r'^index/$',views.index,name='index'),
             url(r'^(?P<blog_id>[0-9]+)/$', views.detail, name='detail'),
             url(r'^meta/$',views.display_meta,name='meta'),
             #url(r'^$',views.register,mame='register'),
             url(r'^register/$',views.register,name='register'),
             url(r'^login/$',views.login,name='login'),
             url(r'^logout/$',views.logout,name='logout'),
             url(r'^new_blog/$',views.new_blog,name='new_blog'),
             url(r'^ajax/$', views.ajax, name='ajax'),
             url(r'^next/$', views.next, name='next'),
             #url(r'^media/(?P<path>.*)','django.views.static.serve',{'document_root':'/var/www/media'}), 
             ]