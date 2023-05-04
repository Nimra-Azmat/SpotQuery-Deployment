# Generated by Django 4.1.7 on 2023-05-01 16:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('artists', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('album', models.CharField(max_length=200)),
                ('album_id', models.CharField(max_length=200, primary_key=True, serialize=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('artist_ids', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='artists.artist')),
            ],
        ),
    ]
