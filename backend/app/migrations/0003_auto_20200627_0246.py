# Generated by Django 3.0.4 on 2020-06-27 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20200627_0132'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Collection',
            new_name='Collections',
        ),
        migrations.AlterField(
            model_name='books',
            name='publication_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
