from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ContactRequest",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("name", models.CharField(max_length=120)),
                ("phone", models.CharField(max_length=40)),
                ("service", models.CharField(max_length=120)),
                ("note", models.TextField(blank=True)),
                ("agree", models.BooleanField(default=False)),
                (
                    "status",
                    models.CharField(
                        choices=[("new", "Новая"), ("in_progress", "В работе"), ("done", "Закрыта")],
                        default="new",
                        max_length=20,
                    ),
                ),
                ("manager_note", models.TextField(blank=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="PortfolioItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveSmallIntegerField(unique=True)),
                ("item_id", models.CharField(max_length=8, unique=True)),
                ("name", models.CharField(max_length=160)),
                ("category", models.CharField(max_length=40)),
                ("spot", models.CharField(max_length=200)),
                ("tag", models.CharField(max_length=40)),
                ("span", models.JSONField(default=list)),
                ("hue", models.PositiveSmallIntegerField()),
            ],
            options={"ordering": ["order"]},
        ),
        migrations.CreateModel(
            name="Service",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveSmallIntegerField(unique=True)),
                ("title", models.CharField(max_length=160)),
                ("short_description", models.CharField(max_length=300)),
                ("description", models.TextField()),
                ("features", models.JSONField(default=list)),
                ("meta", models.JSONField(default=list)),
            ],
            options={"ordering": ["order"]},
        ),
    ]
