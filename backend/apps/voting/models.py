from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from pgvector.django import HnswIndex, VectorField

from apps.voting.domain import SelfVoteNotAllowedError, ensure_user_can_vote_for_feature


class Feature(models.Model):
    """Feature request submitted by a user."""

    title = models.CharField(max_length=255)
    description = models.TextField()
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="owned_features",
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_voted_at = models.DateTimeField(blank=True, null=True)
    number_of_votes = models.PositiveIntegerField(default=0, db_index=True)

    def __str__(self):
        return self.title


class FeatureEmbedding(models.Model):
    """Canonical text and vector representation for semantic duplicate checks."""

    feature = models.OneToOneField(
        Feature,
        on_delete=models.CASCADE,
        related_name="semantic_embedding",
    )
    canonical_text = models.TextField()
    embedding = VectorField(dimensions=settings.FEATURE_EMBEDDING_DIMENSIONS)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            HnswIndex(
                name="feature_embedding_cosine_hnsw",
                fields=["embedding"],
                m=16,
                ef_construction=64,
                opclasses=["vector_cosine_ops"],
            ),
        ]

    def __str__(self):
        return "Embedding for feature #{feature_id}".format(feature_id=self.feature_id)


class Vote(models.Model):
    """A single user's vote on a feature."""

    feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE,
        related_name="votes",
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="feature_votes",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["feature", "user"],
                name="unique_feature_user_vote",
            ),
        ]

    def clean(self):
        super().clean()

        if self.feature_id and self.user_id:
            try:
                ensure_user_can_vote_for_feature(feature=self.feature, user=self.user)
            except SelfVoteNotAllowedError as exc:
                raise ValidationError(str(exc))

    def __str__(self):
        return "{user} -> {feature}".format(
            user=self.user.username,
            feature=self.feature.title,
        )
