# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0018_auto_20151104_1246'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='blog_img',
            field=models.FileField(null=True, upload_to=b'media'),
        ),
    ]
