# Generated by Django 5.1.3 on 2024-12-14 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0002_alter_audiofile_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audiofile',
            name='audio',
            field=models.FileField(upload_to=''),
        ),
    ]
