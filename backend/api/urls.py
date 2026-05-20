from django.urls import path

from .views import ContactRequestView, PortfolioView, ServicesView

urlpatterns = [
    path("services/", ServicesView.as_view(), name="services"),
    path("portfolio/", PortfolioView.as_view(), name="portfolio"),
    path("contact-requests/", ContactRequestView.as_view(), name="contact-requests"),
]
