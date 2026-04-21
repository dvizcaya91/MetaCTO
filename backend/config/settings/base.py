from __future__ import annotations

"""Shared Django settings for all environments."""

import os
from datetime import timedelta
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent


def _get_required_env(*names: str, default: str | None = None) -> str:
    for name in names:
        value = os.getenv(name)
        if value:
            return value

    if default is not None:
        return default

    raise RuntimeError(
        "Missing required environment variable. Expected one of: {names}.".format(
            names=", ".join(names),
        )
    )


def _get_float_env(*names: str, default: float) -> float:
    value = None

    for name in names:
        value = os.getenv(name)
        if value:
            break

    if value is None:
        return default

    try:
        return float(value)
    except ValueError as exc:
        raise RuntimeError(
            "Environment variable must be a float. Expected one of: {names}.".format(
                names=", ".join(names),
            )
        ) from exc

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "django-insecure-change-me")

DEBUG = False

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.postgres",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "apps.users.apps.UsersConfig",
    "apps.authentication.apps.AuthenticationConfig",
    "apps.voting.apps.VotingConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": _get_required_env("POSTGRES_DB", "DB_DATABASE", default="metacto"),
        "USER": _get_required_env("POSTGRES_USER", "DB_USER", default="postgres"),
        "PASSWORD": _get_required_env(
            "POSTGRES_PASSWORD",
            "DB_PASSWORD",
            default="postgres",
        ),
        "HOST": _get_required_env("POSTGRES_HOST", "DB_HOST", default="127.0.0.1"),
        "PORT": _get_required_env("POSTGRES_PORT", "DB_PORT", default="5432"),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"
FIXTURE_DIRS = [BASE_DIR / "fixtures"]

AUTH_USER_MODEL = "users.User"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
}

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_EMBEDDING_MODEL = os.getenv(
    "OPENAI_EMBEDDING_MODEL",
    "text-embedding-3-small",
)
OPENAI_DUPLICATE_CHECK_MODEL = os.getenv(
    "OPENAI_DUPLICATE_CHECK_MODEL",
    "gpt-4.1-mini",
)
FEATURE_EMBEDDING_DIMENSIONS = 1536
FEATURE_SEMANTIC_SIMILARITY_THRESHOLD = _get_float_env(
    "FEATURE_SEMANTIC_SIMILARITY_THRESHOLD",
    default=0.85,
)

if not 0 <= FEATURE_SEMANTIC_SIMILARITY_THRESHOLD <= 1:
    raise RuntimeError(
        "FEATURE_SEMANTIC_SIMILARITY_THRESHOLD must be between 0 and 1."
    )

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
