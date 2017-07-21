# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0012_blog_blog_text_bief'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blog',
            old_name='blog_text_bief',
            new_name='blog_text_brief',
        ),
    ]
