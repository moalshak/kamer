# Generated by Django 3.2.9 on 2021-12-11 13:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20211211_1144'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='additionalCost',
        ),
    ]
