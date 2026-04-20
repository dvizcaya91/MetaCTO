"""API coverage for user endpoints."""

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken


User = get_user_model()


class CurrentUserAPITests(APITestCase):
    """User endpoint coverage."""

    def test_me_returns_authenticated_user_id_and_username(self):
        user = User.objects.create_user(
            username="current-user",
            password="Str0ngPassword123!",
        )
        access_token = str(AccessToken.for_user(user))

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
        response = self.client.get("/api/v1/users/me/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            {
                "id": user.id,
                "username": user.username,
            },
        )

    def test_me_requires_authentication(self):
        response = self.client.get("/api/v1/users/me/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
