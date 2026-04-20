"""Serializers for user endpoints."""

from rest_framework import serializers


class CurrentUserSerializer(serializers.Serializer):
    """Serialize the authenticated user payload."""

    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
