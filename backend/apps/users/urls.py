"""User URL routes."""

from django.urls import path

from apps.users.views import CurrentUserViewSet


app_name = "users"

urlpatterns = [
    path("me/", CurrentUserViewSet.as_view({"get": "retrieve"}), name="me"),
]
