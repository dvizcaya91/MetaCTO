"""Business logic for authentication workflows."""

from dataclasses import dataclass

from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken


@dataclass(frozen=True)
class TokenPair:
    """JWT access and refresh token pair."""

    access: str
    refresh: str


def authenticate_user(*, username, password):
    """Authenticate a user with username and password credentials."""
    user = authenticate(username=username, password=password)

    if user is None:
        raise AuthenticationFailed("Invalid username or password.")

    return user


def issue_tokens_for_user(user):
    """Generate access and refresh tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return TokenPair(
        access=str(refresh.access_token),
        refresh=str(refresh),
    )
