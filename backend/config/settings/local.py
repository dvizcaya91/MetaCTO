"""Local development settings."""

import os

from .base import *  # noqa: F403,F401


DEBUG = os.getenv("DJANGO_DEBUG", "true").lower() in {"1", "true", "yes", "on"}

ALLOWED_HOSTS = [
    host.strip()
    for host in os.getenv(
        "DJANGO_ALLOWED_HOSTS",
        "127.0.0.1,localhost,0.0.0.0,django",
    ).split(",")
    if host.strip()
]
