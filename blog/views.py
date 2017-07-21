#coding:utf-8
import json
from django.shortcuts import render,render_to_response
from django.http import Http404,HttpResponseRedirect,HttpResponse
from django.core.urlresolvers import reverse
from django import forms
from .models import Blog,Comment,User
from django.template import RequestContext
from django.utils import timezone
from django.forms.widgets import Textarea, TextInput
from django.template import Template
from django.http import JsonResponse


firstPageAmt=80
ajaxLoadAmt=20

class UserForm(forms.Form):
    username=forms.CharField(label='用户名:',max_length=50)
    password=forms.CharField(label='密码:',widget=forms.PasswordInput(),max_length=50)
    
    
    def clean_password(self):
        password = self.cleaned_data['password']
        num_words = len(password)
        if num_words < 4:
            raise forms.ValidationError("密码至少4位")
        return password  

class BlogForm(forms.Form):
    blog_title=forms.CharField(label='标题',max_length=100)
    blog_text=forms.CharField(label='正文',widget=Textarea())
    blog_img=forms.FileField(label='图片',required=False)

class CommentForm(forms.Form):
    comment_text=forms.CharField(label='',max_length=200,widget=forms.Textarea({'cols':'20','rows':'3'}))
    
    def clean_comment_text(self):
        comment_text = self.cleaned_data['comment_text']
        num_words = len(comment_text)
        if num_words < 1:
            raise forms.ValidationError("不能为空")
        return comment_text     


def index(request):
    global firstPageAmt
    username=request.session.get('username','')
    blog_list=Blog.objects.order_by('-pub_date')[:firstPageAmt]
    return render(request,'blog/index.html',locals())



def detail(request,blog_id):
    username=request.session.get('username','')
    
    try:
        blog=Blog.objects.get(pk=blog_id)
        blog.blog_text=blog.blog_text.encode('utf-8')#str转回unicode
    except Blog.DoesNotExist:
        raise Http404("Blog does not exist")
    if request.method=='POST':
        if request.POST.get('praise'):
                blog.blog_praise+=1
                blog.save()
                ct=CommentForm()
                return render(request,'blog/detail.html',locals())
        ct=CommentForm(request.POST)
        if ct.is_valid(): 
            
            comment=Comment()
            comment.comment_text=ct.cleaned_data['comment_text']
            comment.pub_date=timezone.now()
            comment.save()
            comment.blog=blog
            comment.save()       
    else:     
        ct=CommentForm()
    return render(request,'blog/detail.html',locals())
    if request.POST.get('praise'):
        blog.blog_praise+=1
        blog.save()
        return  HttpResponseRedirect(reverse('detail',args=(blog.id,)))
    else:
        return render(request,'blog/detail.html',locals())

def display_meta(request):
    values = request.META.items()
    values.sort()
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table>%s</table>' % '\n'.join(html))

     
  
def register(request):
    errors=""
    if request.method=="POST":
        uf=UserForm(request.POST)
        if uf.is_valid():
            username=uf.cleaned_data['username']
            password=uf.cleaned_data['password']
            if User.objects.filter(username=username):
                errors="该用户名已存在,请更改"
                return render(request,'blog/register.html',locals())   
            else:
                
                user=User()
                user.username=username
                user.password=password
            
            user.save()
            return render(request,'blog/success.html',{'username':username})
    else:
        uf=UserForm()
    return render(request,'blog/register.html',{'uf':uf})

def login(request):
    if request.method=='POST':
        uf=UserForm(request.POST)
        if uf.is_valid():  
            username=uf.cleaned_data['username']
            password=uf.cleaned_data['password']
            user=User.objects.filter(username__exact=username,password__exact=password)
            if user:
                response=HttpResponseRedirect('/blog/index/')
                request.session['username']=username
                return response
            else:
                return HttpResponseRedirect('/blog/login/')
            
    else:
        uf=UserForm()
    return render(request,'blog/login.html',{'uf':uf})

def logout(request):
    response=render(request,'blog/logout.html')
    try:
        if request.session['username']:
            del request.session['username']
    finally:
        return response


def new_blog(request):
    try:
        username=request.session.get('username','')
    except:
        pass
    if request.method=='POST':
        bf=BlogForm(request.POST, request.FILES)
        if bf.is_valid():          
            blog_title=bf.cleaned_data['blog_title']
            blog_text=bf.cleaned_data['blog_text']
            blog_img=bf.cleaned_data['blog_img']
            blog=Blog()
            blog.blog_title=blog_title
            blog.blog_text=blog_text
            blog.blog_img=blog_img
            blog.blog_text_brief=blog_text[0:300]
            blog.pub_date=timezone.now()
            blog.save()
            return render(request,'blog/success.html',locals())
    else:
        bf=BlogForm()
    return render(request,'blog/new_blog.html',locals()) 


def ajax(request): 
    i=0
    dict={}
    blogs=Blog.objects.all()
    for blog in blogs:
        dict[i]=blog.blog_title
        i+=1
    return JsonResponse(dict)
    
def next(request):
    global firstPageAmt,ajaxLoadAmt
    page=0
    begin=0
    finish=0
    blogs=Blog.objects.all()
    if request.method=='GET':
        page=int(request.GET['page'])
        if page<2:
            index(request)
        else:
            if len(blogs)>firstPageAmt+1:
                begin=(page-2)*ajaxLoadAmt+firstPageAmt
                if len(blogs)-1<(begin+ajaxLoadAmt):
                    finish=len(blogs)-1

                else:
                    finish=begin+ajaxLoadAmt

            blog_list=blogs[begin:finish+1]
            for blog in blog_list:
                blog.blog_text=blog.blog_text.encode('utf-8')
            return render(request,'blog/ajax.html',locals()) 
        









    


            
    
    