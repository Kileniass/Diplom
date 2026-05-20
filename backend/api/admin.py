from django.contrib import admin
from django.utils.html import format_html

from .models import ContactRequest, ContactRequestAttachment, PortfolioItem, Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("order", "title", "short_description")
    search_fields = ("title", "short_description", "description")
    ordering = ("order",)


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ("order", "item_id", "name", "category", "year", "tag", "photo_thumb")
    list_filter = ("category", "year")
    search_fields = ("item_id", "name", "spot", "tag")
    ordering = ("order",)
    readonly_fields = ("photo_preview",)
    fieldsets = (
        ("Основное", {"fields": ("order", "item_id", "name")}),
        ("Классификация", {"fields": ("category", "spot", "year", "tag")}),
        (
            "Вид на сайте",
            {
                "fields": ("span", "hue", "photo", "photo_preview"),
                "description": "Размер — два числа в JSON: колонки и строки сетки. Оттенок — 0…360.",
            },
        ),
    )

    def photo_thumb(self, obj):
        if obj.photo:
            return format_html(
                '<img src="{}" alt="" style="height:36px;width:auto;vertical-align:middle;border-radius:2px"/>',
                obj.photo.url,
            )
        return "—"

    photo_thumb.short_description = "Фото"

    def photo_preview(self, obj):
        if getattr(obj, "photo", None) and obj.photo:
            return format_html(
                '<img src="{}" alt="" style="max-width:320px;max-height:200px;border-radius:4px;border:1px solid #333"/>',
                obj.photo.url,
            )
        return "Файл не загружен"

    photo_preview.short_description = "Предпросмотр"


class ContactRequestAttachmentInline(admin.TabularInline):
    model = ContactRequestAttachment
    extra = 0
    readonly_fields = ("created_at",)
    fields = ("file", "created_at")


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "name",
        "phone",
        "service",
        "status_badge",
        "short_note",
    )
    list_filter = ("status", "service", "created_at")
    search_fields = ("name", "phone", "service", "note", "manager_note")
    readonly_fields = ("created_at",)
    inlines = (ContactRequestAttachmentInline,)
    actions = ("mark_in_progress", "mark_done")
    fieldsets = (
        ("Клиент", {"fields": ("created_at", "name", "phone", "service")}),
        ("Комментарий клиента", {"fields": ("note",)}),
        ("CRM", {"fields": ("status", "manager_note")}),
        ("Юридическое", {"fields": ("agree",)}),
    )

    def status_badge(self, obj):
        color_map = {
            ContactRequest.Status.NEW: "#d97706",
            ContactRequest.Status.IN_PROGRESS: "#2563eb",
            ContactRequest.Status.DONE: "#059669",
        }
        color = color_map.get(obj.status, "#6b7280")
        return format_html(
            '<span style="padding:3px 8px;border-radius:999px;background:{}22;color:{};font-weight:600;">{}</span>',
            color,
            color,
            obj.get_status_display(),
        )

    status_badge.short_description = "Статус"

    def short_note(self, obj):
        if not obj.note:
            return "—"
        return (obj.note[:70] + "...") if len(obj.note) > 70 else obj.note

    short_note.short_description = "Комментарий"

    @admin.action(description="Перевести в статус: В работе")
    def mark_in_progress(self, request, queryset):
        queryset.update(status=ContactRequest.Status.IN_PROGRESS)

    @admin.action(description="Перевести в статус: Закрыта")
    def mark_done(self, request, queryset):
        queryset.update(status=ContactRequest.Status.DONE)
