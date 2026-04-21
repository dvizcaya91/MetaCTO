"""Business logic for feature and vote workflows."""

from django.db import transaction
from django.db.models import BooleanField, Case, Exists, F, Max, OuterRef, Q, Value, When
from django.utils import timezone

from apps.voting.domain import (
    DuplicateVoteError,
    VoteNotFoundError,
    ensure_user_can_vote_for_feature,
)
from apps.voting.models import Feature, FeatureEmbedding, Vote
from apps.voting.semantic import (
    SemanticDuplicateFeatureError,
    SemanticValidationUnavailableError,
    build_feature_canonical_text,
    semantic_feature_validator,
)


SORT_OPTIONS = {
    "created_at": ("-created_at", "-id"),
    "number_of_votes": ("-number_of_votes", "-created_at", "-id"),
}


def get_feature_queryset_for_user(*, user):
    """Return a queryset annotated with user-specific feature flags."""
    queryset = Feature.objects.select_related("owner")

    if user.is_authenticated:
        vote_exists = Vote.objects.filter(feature_id=OuterRef("pk"), user_id=user.id)
        return queryset.annotate(
            has_voted=Exists(vote_exists),
            is_owner=Case(
                When(owner_id=user.id, then=Value(True)),
                default=Value(False),
                output_field=BooleanField(),
            ),
        )

    return queryset.annotate(
        has_voted=Value(False, output_field=BooleanField()),
        is_owner=Value(False, output_field=BooleanField()),
    )


def list_features(*, user, query="", sort="number_of_votes", mine=False, voted=False):
    """Build the public feature listing with search, filters, and sorting."""
    queryset = get_feature_queryset_for_user(user=user)

    if query:
        queryset = queryset.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        )

    if mine:
        queryset = queryset.filter(owner=user)

    if voted:
        queryset = queryset.filter(votes__user=user).distinct()

    if sort == "last_voted_at":
        return queryset.order_by(
            F("last_voted_at").desc(nulls_last=True),
            "-created_at",
            "-id",
        )

    return queryset.order_by(*SORT_OPTIONS[sort])


def create_feature(*, owner, title, description, force=False):
    """Create a feature owned by the authenticated user after semantic validation."""
    canonical_text = build_feature_canonical_text(title=title, description=description)

    try:
        embedding = semantic_feature_validator.generate_embedding(canonical_text)
    except SemanticValidationUnavailableError:
        raise

    if not force:
        duplicate_match = semantic_feature_validator.find_duplicate_match(
            canonical_text=canonical_text,
            embedding=embedding,
        )
        if duplicate_match is not None:
            raise SemanticDuplicateFeatureError(
                confidence=duplicate_match.confidence,
                feature_id=duplicate_match.feature_id,
                reason=duplicate_match.reason,
                similarity=duplicate_match.similarity,
            )

    with transaction.atomic():
        feature = Feature.objects.create(
            owner=owner,
            title=title,
            description=description,
        )
        FeatureEmbedding.objects.create(
            feature=feature,
            canonical_text=canonical_text,
            embedding=embedding,
        )

    return feature


def get_feature_for_user(*, user, feature_id):
    """Return a single annotated feature for serializer responses."""
    return get_feature_queryset_for_user(user=user).get(pk=feature_id)


def vote_for_feature(*, feature_id, user):
    """Create a vote and update feature counters atomically."""
    with transaction.atomic():
        feature = Feature.objects.select_for_update().select_related("owner").get(
            pk=feature_id
        )
        ensure_user_can_vote_for_feature(feature=feature, user=user)

        if Vote.objects.filter(feature_id=feature.id, user_id=user.id).exists():
            raise DuplicateVoteError("You have already voted for this feature.")

        Vote.objects.create(feature=feature, user=user)
        feature.number_of_votes += 1
        feature.last_voted_at = timezone.now()
        feature.save(update_fields=["number_of_votes", "last_voted_at"])

    return feature


def unvote_feature(*, feature_id, user):
    """Remove a vote and update feature counters atomically."""
    with transaction.atomic():
        feature = Feature.objects.select_for_update().select_related("owner").get(
            pk=feature_id
        )
        vote = Vote.objects.filter(feature_id=feature.id, user_id=user.id).first()

        if vote is None:
            raise VoteNotFoundError("You have not voted for this feature.")

        vote.delete()

        latest_vote_at = Vote.objects.filter(feature_id=feature.id).aggregate(
            last_voted_at=Max("created_at")
        )["last_voted_at"]

        feature.number_of_votes = max(feature.number_of_votes - 1, 0)
        feature.last_voted_at = latest_vote_at
        feature.save(update_fields=["number_of_votes", "last_voted_at"])

    return feature
