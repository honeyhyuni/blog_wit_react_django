# Generated by Django 4.1.3 on 2022-11-30 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blog", "0002_freeboard_photo_alter_freeboard_caption_operateboard_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="freeboard",
            name="title",
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="noticeinform",
            name="title",
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="operateboard",
            name="title",
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
