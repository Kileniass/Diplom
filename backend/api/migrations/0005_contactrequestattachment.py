import api.models
import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_portfolio_russian_fields"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContactRequestAttachment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("file", models.FileField(
                    upload_to="contact_requests/%Y/%m/",
                    validators=[
                        django.core.validators.FileExtensionValidator(allowed_extensions=["png", "pdf"]),
                        api.models.validate_file_size_30mb,
                    ],
                )),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "contact_request",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="attachments",
                        to="api.contactrequest",
                    ),
                ),
            ],
            options={
                "ordering": ["created_at"],
            },
        ),
    ]
