# Generated by Django 4.2.10 on 2024-02-13 18:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_employee_files'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('assigned_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.employee')),
            ],
        ),
        migrations.CreateModel(
            name='WorkInProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.employee')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.task')),
            ],
        ),
    ]
