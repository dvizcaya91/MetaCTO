"""Business logic for authentication workflows."""

from dataclasses import dataclass

from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import TokenError
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


def issue_access_token_from_refresh(*, refresh):
    """Generate a new access token from a valid refresh token."""
    try:
        refresh_token = RefreshToken(refresh)
    except TokenError as exc:
        raise AuthenticationFailed("Invalid refresh token.") from exc

    return str(refresh_token.access_token)
