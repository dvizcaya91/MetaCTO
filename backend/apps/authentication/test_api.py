from datetime import timedelta

from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken


User = get_user_model()


class AuthenticationAPITests(APITestCase):
    """Authentication endpoint coverage."""

    def test_signup_returns_access_and_refresh_tokens(self):
        response = self.client.post(
            "/api/v1/auth/signup/",
            {
                "username": "new-user",
                "password": "Str0ngPassword123!",
                "email": "new-user@example.com",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertTrue(User.objects.filter(username="new-user").exists())

        access_token = AccessToken(response.data["access"])
        refresh_token = RefreshToken(response.data["refresh"])

        self.assertEqual(access_token["token_type"], "access")
        self.assertEqual(refresh_token["token_type"], "refresh")

    def test_login_returns_access_and_refresh_tokens(self):
        user = User.objects.create_user(
            username="existing-user",
            password="Str0ngPassword123!",
        )

        response = self.client.post(
            "/api/v1/auth/login/",
            {
                "username": user.username,
                "password": "Str0ngPassword123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_rejects_invalid_credentials(self):
        User.objects.create_user(
            username="existing-user",
            password="Str0ngPassword123!",
        )

        response = self.client.post(
            "/api/v1/auth/login/",
            {
                "username": "existing-user",
                "password": "invalid-password",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["detail"], "Invalid username or password.")

    def test_refresh_returns_new_access_token(self):
        user = User.objects.create_user(
            username="refresh-user",
            password="Str0ngPassword123!",
        )
        refresh_token = str(RefreshToken.for_user(user))

        response = self.client.post(
            "/api/v1/auth/refresh/",
            {"refresh": refresh_token},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertNotIn("refresh", response.data)

        access_token = AccessToken(response.data["access"])
        self.assertEqual(access_token["token_type"], "access")
        self.assertEqual(access_token["user_id"], user.id)

    def test_refresh_rejects_invalid_refresh_token(self):
        response = self.client.post(
            "/api/v1/auth/refresh/",
            {"refresh": "not-a-valid-token"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["detail"], "Invalid refresh token.")

    def test_jwt_token_lifetimes_match_configuration(self):
        self.assertEqual(
            settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            timedelta(minutes=5),
        )
        self.assertEqual(
            settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
            timedelta(days=30),
        )
