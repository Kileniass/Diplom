from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
from django.db import models


class Service(models.Model):
    order = models.PositiveSmallIntegerField(unique=True)
    title = models.CharField(max_length=160)
    short_description = models.CharField(max_length=300)
    description = models.TextField()
    features = models.JSONField(default=list)
    meta = models.JSONField(default=list)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class PortfolioCategory(models.TextChoices):
    LETTERS = "letters", "Объёмные буквы"
    BOX = "box", "Световые короба"
    LIGHT = "light", "Лайтбоксы"
    BANNER = "banner", "Баннеры"
    PYLON = "pylon", "Стелы"
    TRANSPORT = "transport", "Транспорт"
    ROOF = "roof", "Крышные установки"


class PortfolioItem(models.Model):
    order = models.PositiveSmallIntegerField(
        unique=True,
        verbose_name="Порядок в списке",
        help_text="Чем меньше число, тем выше карточка на сайте.",
    )
    item_id = models.CharField(
        max_length=8,
        unique=True,
        verbose_name="Код карточки",
        help_text="Короткий номер для отображения, например 01.",
    )
    name = models.CharField(max_length=160, verbose_name="Название объекта")
    category = models.CharField(
        max_length=40,
        choices=PortfolioCategory.choices,
        verbose_name="Категория",
    )
    spot = models.CharField(
        max_length=200,
        verbose_name="Место / описание локации",
        help_text="Адрес, торговый центр или краткая подпись под названием.",
    )
    tag = models.CharField(
        max_length=40,
        blank=True,
        verbose_name="Метка на карточке",
        help_text="Обычно год (например 2024). Можно оставить пустым.",
    )
    span = models.JSONField(
        default=list,
        verbose_name="Размер в сетке",
        help_text='Два числа: ширина и высота в ячейках, например [6, 3].',
    )
    hue = models.PositiveSmallIntegerField(
        verbose_name="Оттенок подсветки",
        help_text="Число от 0 до 360 — цвет декоративной подсветки карточки.",
        validators=[MinValueValidator(0), MaxValueValidator(360)],
    )
    photo = models.ImageField(
        upload_to="portfolio/%Y/%m/",
        blank=True,
        null=True,
        verbose_name="Фотография",
        help_text="Фото работы для карточки в портфолио (необязательно).",
    )
    year = models.PositiveSmallIntegerField(
        default=2024,
        validators=[MinValueValidator(1990), MaxValueValidator(2100)],
        verbose_name="Год выполнения",
    )

    class Meta:
        ordering = ["order"]
        verbose_name = "Пример работы (портфолио)"
        verbose_name_plural = "Портфолио"

    def __str__(self):
        return f"{self.item_id} · {self.name}"


class ContactRequest(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Новая"
        IN_PROGRESS = "in_progress", "В работе"
        DONE = "done", "Закрыта"

    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=40)
    service = models.CharField(max_length=120)
    note = models.TextField(blank=True)
    agree = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    manager_note = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} · {self.phone}"


def validate_file_size_30mb(value):
    max_size = 30 * 1024 * 1024
    if value.size > max_size:
        raise ValidationError("Размер файла не должен превышать 30 МБ.")


class ContactRequestAttachment(models.Model):
    contact_request = models.ForeignKey(
        ContactRequest,
        on_delete=models.CASCADE,
        related_name="attachments",
    )
    file = models.FileField(
        upload_to="contact_requests/%Y/%m/",
        validators=[
            FileExtensionValidator(allowed_extensions=["png", "pdf"]),
            validate_file_size_30mb,
        ],
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Файл #{self.pk} для заявки {self.contact_request_id}"
