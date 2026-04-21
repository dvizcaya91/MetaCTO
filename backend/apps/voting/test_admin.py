from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from apps.voting.models import Feature, FeatureEmbedding


User = get_user_model()


class FeatureAdminTests(TestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="Str0ngPassword123!",
        )
        self.client.force_login(self.admin_user)

    def test_feature_changelist_shows_embedding_status(self):
        feature_with_embedding = Feature.objects.create(
            title="Dark mode",
            description="Please add dark mode.",
            owner=self.admin_user,
        )
        FeatureEmbedding.objects.create(
            feature=feature_with_embedding,
            canonical_text="Add dark mode to the application.",
            embedding=[0.0] * 1536,
        )
        Feature.objects.create(
            title="Notifications",
            description="Please add notification preferences.",
            owner=self.admin_user,
        )

        response = self.client.get(reverse("admin:voting_feature_changelist"))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Dark mode")
        self.assertContains(response, "Notifications")
        self.assertContains(response, "icon-yes.svg")
        self.assertContains(response, "icon-no.svg")

