# -*- coding: utf-8 -*-
from django.db import models
from django.utils import timezone
from django.contrib import admin


class User(models.Model):
    username = models.CharField(max_length=50,primary_key=True)
    password = models.CharField(max_length=50)

class Blog(models.Model):
    user=models.ForeignKey(User,null=True)
    blog_title=models.TextField(max_length=100,default='Title')
    pub_date=models.DateTimeField()
    blog_text=models.TextField(default='Content')
    blog_text_brief=models.TextField(default='Brief')
    blog_praise=models.IntegerField(default=0)
    blog_img=models.FileField(upload_to='images',default='')
    
        
    def __unicode__(self):
        return self.blog_title

class Comment(models.Model):
    blog=models.ForeignKey(Blog,null=True)
    comment_text=models.TextField(max_length=200)
    pub_date=models.DateTimeField('date published')
 
    
    def __unicode__(self):
        return self.comment_text


    

