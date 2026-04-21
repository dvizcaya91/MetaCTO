from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from apps.voting.models import Feature, Vote


User = get_user_model()


class FeatureAPITests(APITestCase):
    """Feature endpoint coverage."""

    def setUp(self):
        self.owner = User.objects.create_user(
            username="owner",
            password="Str0ngPassword123!",
        )
        self.voter = User.objects.create_user(
            username="voter",
            password="Str0ngPassword123!",
        )

    def test_create_feature_requires_authentication(self):
        response = self.client.post(
            "/api/v1/features/",
            {"title": "Dark mode", "description": "Please add dark mode."},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_feature_returns_serialized_feature(self):
        self.client.force_authenticate(user=self.owner)

        response = self.client.post(
            "/api/v1/features/",
            {"title": "Dark mode", "description": "Please add dark mode."},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "Dark mode")
        self.assertEqual(response.data["owner"], self.owner.id)
        self.assertEqual(response.data["number_of_votes"], 0)
        self.assertTrue(response.data["is_owner"])
        self.assertFalse(response.data["has_voted"])

    def test_vote_updates_counter_and_last_voted_at(self):
        feature = Feature.objects.create(
            title="Dark mode",
            description="Please add dark mode.",
            owner=self.owner,
        )
        self.client.force_authenticate(user=self.voter)

        response = self.client.post(f"/api/v1/features/{feature.id}/vote/", format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        feature.refresh_from_db()
        self.assertEqual(feature.number_of_votes, 1)
        self.assertIsNotNone(feature.last_voted_at)
        self.assertTrue(Vote.objects.filter(feature=feature, user=self.voter).exists())
        self.assertTrue(response.data["has_voted"])

    def test_vote_rejects_feature_owner(self):
        feature = Feature.objects.create(
            title="Dark mode",
            description="Please add dark mode.",
            owner=self.owner,
        )
        self.client.force_authenticate(user=self.owner)

        response = self.client.post(f"/api/v1/features/{feature.id}/vote/", format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["detail"],
            "Feature owners cannot vote for their own feature.",
        )

    def test_vote_rejects_duplicate_votes(self):
        feature = Feature.objects.create(
            title="Dark mode",
            description="Please add dark mode.",
            owner=self.owner,
        )
        Vote.objects.create(feature=feature, user=self.voter)
        feature.number_of_votes = 1
        feature.last_voted_at = timezone.now()
        feature.save(update_fields=["number_of_votes", "last_voted_at"])
        self.client.force_authenticate(user=self.voter)

        response = self.client.post(f"/api/v1/features/{feature.id}/vote/", format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "You have already voted for this feature.")

    def test_unvote_updates_counter_and_vote_state(self):
        feature = Feature.objects.create(
            title="Dark mode",
            description="Please add dark mode.",
            owner=self.owner,
        )
        vote = Vote.objects.create(feature=feature, user=self.voter)
        feature.number_of_votes = 1
        feature.last_voted_at = vote.created_at
        feature.save(update_fields=["number_of_votes", "last_voted_at"])
        self.client.force_authenticate(user=self.voter)

        response = self.client.post(f"/api/v1/features/{feature.id}/unvote/", format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        feature.refresh_from_db()
        self.assertEqual(feature.number_of_votes, 0)
        self.assertIsNone(feature.last_voted_at)
        self.assertFalse(Vote.objects.filter(feature=feature, user=self.voter).exists())
        self.assertFalse(response.data["has_voted"])

    def test_list_features_is_public_and_returns_false_flags_for_anonymous_users(self):
        Feature.objects.create(
            title="Dark mode",
            description="Please add dark mode.",
            owner=self.owner,
        )

        response = self.client.get("/api/v1/features/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertFalse(response.data["results"][0]["is_owner"])
        self.assertFalse(response.data["results"][0]["has_voted"])

    def test_list_features_supports_query_sort_and_authenticated_flags(self):
        first_feature = Feature.objects.create(
            title="Dark mode",
            description="Please add dark mode.",
            owner=self.owner,
        )
        second_feature = Feature.objects.create(
            title="Analytics",
            description="Add an analytics dashboard.",
            owner=self.voter,
        )
        Vote.objects.create(feature=first_feature, user=self.voter)
        first_feature.number_of_votes = 1
        first_feature.last_voted_at = timezone.now()
        first_feature.save(update_fields=["number_of_votes", "last_voted_at"])

        self.client.force_authenticate(user=self.voter)
        response = self.client.get(
            "/api/v1/features/",
            {"query": "dark", "sort": "number_of_votes"},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["id"], first_feature.id)
        self.assertFalse(response.data["results"][0]["is_owner"])
        self.assertTrue(response.data["results"][0]["has_voted"])
        self.assertEqual(second_feature.number_of_votes, 0)

    def test_list_features_filters_mine_and_voted(self):
        owned_feature = Feature.objects.create(
            title="Dark mode",
            description="Please add dark mode.",
            owner=self.owner,
        )
        voted_feature = Feature.objects.create(
            title="Analytics",
            description="Add an analytics dashboard.",
            owner=self.voter,
        )
        Vote.objects.create(feature=voted_feature, user=self.owner)
        voted_feature.number_of_votes = 1
        voted_feature.last_voted_at = timezone.now()
        voted_feature.save(update_fields=["number_of_votes", "last_voted_at"])

        self.client.force_authenticate(user=self.owner)
        response = self.client.get("/api/v1/features/", {"mine": "true", "voted": "true"})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["results"], [])
        self.assertEqual(owned_feature.number_of_votes, 0)

    def test_list_filters_require_authentication_for_anonymous_user(self):
        response = self.client.get("/api/v1/features/", {"mine": "true"})

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
