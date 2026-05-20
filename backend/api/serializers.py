from rest_framework import serializers

from .models import ContactRequest, ContactRequestAttachment, PortfolioItem, Service


class ServiceSerializer(serializers.ModelSerializer):
    t = serializers.CharField(source="title")
    d = serializers.CharField(source="short_description")
    long = serializers.CharField(source="description")

    class Meta:
        model = Service
        fields = ("t", "d", "long", "features", "meta")


class PortfolioItemSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="item_id")
    cat = serializers.CharField(source="category")
    photo = serializers.SerializerMethodField()

    class Meta:
        model = PortfolioItem
        fields = ("id", "name", "cat", "spot", "tag", "span", "hue", "photo", "year")

    def get_photo(self, obj):
        if not obj.photo:
            return None
        request = self.context.get("request")
        url = obj.photo.url
        if request:
            return request.build_absolute_uri(url)
        return url


class ContactRequestSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=120)
    phone = serializers.CharField(max_length=40)
    service = serializers.CharField(max_length=120)
    note = serializers.CharField(required=False, allow_blank=True)
    agree = serializers.BooleanField()
    files = serializers.ListField(
        child=serializers.FileField(),
        required=False,
        allow_empty=True,
        write_only=True,
    )

    class Meta:
        model = ContactRequest
        fields = ("name", "phone", "service", "note", "agree", "files")

    def validate_agree(self, value):
        if not value:
            raise serializers.ValidationError("Consent is required.")
        return value

    def validate_files(self, files):
        allowed_extensions = {".png", ".pdf"}
        total_size = 0
        for file in files:
            filename = getattr(file, "name", "").lower()
            if not any(filename.endswith(ext) for ext in allowed_extensions):
                raise serializers.ValidationError("Можно загружать только PNG и PDF.")
            total_size += getattr(file, "size", 0)
        if total_size > 30 * 1024 * 1024:
            raise serializers.ValidationError("Суммарный размер файлов не должен превышать 30 МБ.")
        return files

    def create(self, validated_data):
        files = validated_data.pop("files", [])
        contact_request = ContactRequest.objects.create(**validated_data)
        for file in files:
            ContactRequestAttachment.objects.create(contact_request=contact_request, file=file)
        return contact_request
