# Generated by Django 4.1.7 on 2023-05-09 10:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("albums", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="album",
            name="album",
            field=models.CharField(max_length=400),
        ),
        migrations.AlterField(
            model_name="album",
            name="album_id",
            field=models.CharField(
                max_length=400, primary_key=True, serialize=False, unique=True
            ),
        ),
    ]
