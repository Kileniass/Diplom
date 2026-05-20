from rest_framework import status
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import PortfolioItem, Service
from .serializers import (
    ContactRequestSerializer,
    PortfolioItemSerializer,
    ServiceSerializer,
)


class ServicesView(APIView):
    def get(self, request):
        queryset = Service.objects.all()
        return Response(ServiceSerializer(queryset, many=True).data)


class PortfolioView(APIView):
    def get(self, request):
        queryset = PortfolioItem.objects.all()
        data = PortfolioItemSerializer(
            queryset,
            many=True,
            context={"request": request},
        ).data
        return Response(data)


class ContactRequestView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request):
        serializer = ContactRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(
            {"ok": True, "message": "Request accepted", "id": instance.id},
            status=status.HTTP_201_CREATED,
        )
