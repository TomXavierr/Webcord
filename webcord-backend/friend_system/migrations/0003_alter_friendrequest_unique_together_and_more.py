# Generated by Django 4.2.4 on 2023-10-10 05:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('friend_system', '0002_alter_friendrequest_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='friendrequest',
            unique_together={('sender', 'receiver')},
        ),
        migrations.AddField(
            model_name='friendrequest',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('declined', 'Declined')], default='pending', max_length=10),
        ),
        migrations.RemoveField(
            model_name='friendrequest',
            name='is_active',
        ),
    ]
