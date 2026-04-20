"""Services for user-related business logic."""

from django.contrib.auth import get_user_model


User = get_user_model()


def create_user(*, username, password, email="", first_name="", last_name=""):
    """Create a user with the provided credentials and profile data."""
    return User.objects.create_user(
        username=username,
        password=password,
        email=email,
        first_name=first_name,
        last_name=last_name,
    )
