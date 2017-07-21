# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20150511_1522'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='blog_praise',
            field=models.IntegerField(default=0),
        ),
    ]
