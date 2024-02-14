# Generated by Django 4.2.10 on 2024-02-13 15:56

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_employee_files'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='files',
            field=models.FileField(blank=True, null=True, upload_to='files/', validators=[django.core.validators.FileExtensionValidator(['pdf'])]),
        ),
    ]