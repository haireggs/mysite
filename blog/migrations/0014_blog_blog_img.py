# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0013_auto_20151026_2314'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='blog_img',
            field=models.FileField(null=True, upload_to=b'./upload'),
        ),
    ]
