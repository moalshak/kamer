# Generated by Django 3.2.9 on 2021-12-11 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_property_pagetitle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='pets',
            field=models.CharField(default='', max_length=3, null=True),
        ),
    ]
