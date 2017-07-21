# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='comment',
        ),
        migrations.AddField(
            model_name='comment',
            name='blog',
            field=models.ForeignKey(to='blog.Blog', null=True),
        ),
        migrations.AlterField(
            model_name='blog',
            name='blog_text',
            field=models.TextField(default=b'Content'),
        ),
        migrations.AlterField(
            model_name='blog',
            name='blog_title',
            field=models.CharField(default=b'Title', max_length=100),
        ),
    ]
