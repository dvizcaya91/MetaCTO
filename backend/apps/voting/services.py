"""Business rules for the voting domain."""

from django.core.exceptions import ValidationError


def ensure_user_can_vote_for_feature(*, feature, user):
    """Reject votes on a user's own feature."""
    if feature.owner_id == user.id:
        raise ValidationError("Feature owners cannot vote for their own feature.")
