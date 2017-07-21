# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0011_blog_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='blog_text_bief',
            field=models.TextField(default=b'Brief'),
        ),
    ]
