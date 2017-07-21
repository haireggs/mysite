# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Blog,Comment,User

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 3


class BlogAdmin(admin.ModelAdmin):
    list_display=('blog_title','pub_date','blog_text_brief','blog_praise')
    search_fields=('blog_title','pub_date',)
    list_filter = ('pub_date',)
    date_hierarchy = 'pub_date'
    ordering = ('-pub_date',)
    fieldsets = [
        ('Title',               {'fields': ['blog_title']}),
        ('Date information', {'fields': ['pub_date']}),
        ('Content',{'fields':['blog_text']}),
        ('Content brief',{'fields':['blog_text_brief']}),
     ]
   
    inlines=[CommentInline]

class UserAdmin(admin.ModelAdmin):
    list_display = ('username','password')
    
admin.site.register(Blog, BlogAdmin)    
admin.site.register(User,UserAdmin)
admin.site.register(Comment)
