# 个人网站

包含个人简历页面，新闻展示网站，打尼玛小游戏。

网站搭建环境及后端部分：

Ubuntu14.04 + python2.7 + django + MySQL + Apache2.4，部署于阿里云服务器。

[个人简历(resume)](http://120.25.74.236)前端部分由React + dva + antd 完成。

[新闻展示网站(blog)](http://120.25.74.236/blog)前端部分由jQuery + Bootstrap + Masonry + infinite-scroll完成。

[打尼玛小游戏(danima)](http://120.25.74.236/danima)前端部分由纯Javascript + css 完成。

#### 使用方法

##### 通过Django自带server运行：

修改 mysite/mysite/settings.py 中的 DEBUG 为 TRUE

cd 到根目录

`python manage.py runserver 8080`

浏览器打开[http://127.0.0.1:8080/](http://127.0.0.1:8080/)

##### 通过Apache运行：

参考[apache设置]()

