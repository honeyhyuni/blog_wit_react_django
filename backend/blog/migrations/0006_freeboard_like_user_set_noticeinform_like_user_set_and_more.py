# Generated by Django 4.1.3 on 2022-12-08 06:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("blog", "0005_alter_freeboard_author_alter_noticeinform_author_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="freeboard",
            name="like_user_set",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name="noticeinform",
            name="like_user_set",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name="operateboard",
            name="like_user_set",
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
