# Generated by Django 4.1.7 on 2023-03-08 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model', models.CharField(max_length=200)),
                ('year', models.IntegerField()),
                ('fuel_type', models.CharField(max_length=200)),
                ('cc', models.CharField(max_length=200)),
                ('hp', models.CharField(max_length=200)),
                ('transmission_type', models.CharField(max_length=200)),
            ],
        ),
    ]
