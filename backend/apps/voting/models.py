from django.conf import settings
from django.db import models

from apps.voting.services import ensure_user_can_vote_for_feature


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
            ensure_user_can_vote_for_feature(feature=self.feature, user=self.user)

    def __str__(self):
        return "{user} -> {feature}".format(
            user=self.user.username,
            feature=self.feature.title,
        )
