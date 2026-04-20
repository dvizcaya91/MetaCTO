from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.authentication.serializers import (
    AccessTokenSerializer,
    LoginSerializer,
    RefreshTokenSerializer,
    SignupSerializer,
    TokenPairSerializer,
)
from apps.authentication.services import (
    authenticate_user,
    issue_access_token_from_refresh,
    issue_tokens_for_user,
)
from apps.users.services import create_user


class SignupViewSet(viewsets.GenericViewSet):
    """Create users and return JWT tokens."""

    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    serializer_class = SignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = create_user(**serializer.validated_data)
        tokens = issue_tokens_for_user(user)

        response_serializer = TokenPairSerializer(tokens)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class LoginViewSet(viewsets.GenericViewSet):
    """Authenticate users and return JWT tokens."""

    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate_user(**serializer.validated_data)
        tokens = issue_tokens_for_user(user)

        response_serializer = TokenPairSerializer(tokens)
        return Response(response_serializer.data, status=status.HTTP_200_OK)


class RefreshTokenViewSet(viewsets.GenericViewSet):
    """Exchange a refresh token for a new access token."""

    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    serializer_class = RefreshTokenSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        access_token = issue_access_token_from_refresh(**serializer.validated_data)
        response_serializer = AccessTokenSerializer({"access": access_token})
        return Response(response_serializer.data, status=status.HTTP_200_OK)
