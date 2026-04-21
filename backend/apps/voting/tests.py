from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.test import TestCase

from apps.users.models import User
from apps.voting.models import Feature, Vote


class VotingModelTests(TestCase):
    """Model coverage for the voting app."""

    def setUp(self):
        self.owner = User.objects.create_user(
            username="feature-owner",
            password="Str0ngPassword123!",
        )
        self.other_user = User.objects.create_user(
            username="feature-voter",
            password="Str0ngPassword123!",
        )

    def test_feature_defaults_vote_tracking_fields(self):
        feature = Feature.objects.create(
            title="Dark mode",
            description="Add a dark mode option to the product.",
            owner=self.owner,
        )

        self.assertEqual(feature.number_of_votes, 0)
        self.assertIsNone(feature.last_voted_at)
        self.assertIsNotNone(feature.created_at)
        self.assertIsNotNone(feature.updated_at)

    def test_vote_unique_constraint_prevents_duplicate_votes(self):
        feature = Feature.objects.create(
            title="Dark mode",
            description="Add a dark mode option to the product.",
            owner=self.owner,
        )
        Vote.objects.create(feature=feature, user=self.other_user)

        with self.assertRaises(IntegrityError):
            Vote.objects.create(feature=feature, user=self.other_user)

    def test_vote_validation_rejects_feature_owner_voting_for_own_feature(self):
        feature = Feature.objects.create(
            title="Dark mode",
            description="Add a dark mode option to the product.",
            owner=self.owner,
        )
        vote = Vote(feature=feature, user=self.owner)

        with self.assertRaises(ValidationError):
            vote.full_clean()
