"""Serializers for authentication workflows."""

from django.contrib.auth import get_user_model, password_validation
from rest_framework import serializers


User = get_user_model()


class TokenPairSerializer(serializers.Serializer):
    """Token pair response serializer."""

    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)


class SignupSerializer(serializers.Serializer):
    """Validate signup requests."""

    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, trim_whitespace=False)
    email = serializers.EmailField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=150)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value


class LoginSerializer(serializers.Serializer):
    """Validate login requests."""

    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, trim_whitespace=False)
