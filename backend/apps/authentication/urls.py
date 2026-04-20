"""Authentication URL routes."""

from django.urls import path

from apps.authentication.views import LoginViewSet, SignupViewSet


app_name = "authentication"

urlpatterns = [
    path("signup/", SignupViewSet.as_view({"post": "create"}), name="signup"),
    path("login/", LoginViewSet.as_view({"post": "create"}), name="login"),
]
