# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_blog_blog_praise'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='blog_title',
            field=models.TextField(default=b'Title', max_length=100),
        ),
    ]
