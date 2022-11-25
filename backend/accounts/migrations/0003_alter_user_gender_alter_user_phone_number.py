# Generated by Django 4.1.3 on 2022-11-25 08:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_user_age_alter_user_gender"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="gender",
            field=models.CharField(
                choices=[("M", "남성"), ("F", "여성")], default="M", max_length=1
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="phone_number",
            field=models.CharField(
                max_length=13,
                validators=[
                    django.core.validators.RegexValidator("^010-?[1-9]\\d{3}-?\\d{4}$")
                ],
            ),
        ),
    ]
