"""Serializers for feature endpoints."""

from rest_framework import serializers

from apps.voting.models import Feature, Vote


class FeatureSerializer(serializers.ModelSerializer):
    """Serialize feature resources for list and mutation responses."""

    is_owner = serializers.SerializerMethodField()
    has_voted = serializers.SerializerMethodField()

    class Meta:
        model = Feature
        fields = (
            "id",
            "title",
            "description",
            "owner",
            "created_at",
            "updated_at",
            "last_voted_at",
            "number_of_votes",
            "is_owner",
            "has_voted",
        )
        read_only_fields = fields

    def get_is_owner(self, obj):
        if hasattr(obj, "is_owner"):
            return obj.is_owner

        request = self.context.get("request")
        return bool(request and request.user.is_authenticated and obj.owner_id == request.user.id)

    def get_has_voted(self, obj):
        if hasattr(obj, "has_voted"):
            return obj.has_voted

        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False

        return Vote.objects.filter(feature_id=obj.id, user_id=request.user.id).exists()


class FeatureCreateSerializer(serializers.ModelSerializer):
    """Validate feature creation payloads."""

    class Meta:
        model = Feature
        fields = ("title", "description")


class FeatureListQuerySerializer(serializers.Serializer):
    """Validate query parameters for feature listing."""

    query = serializers.CharField(required=False, allow_blank=True, default="")
    sort = serializers.ChoiceField(
        required=False,
        choices=("created_at", "last_voted_at", "number_of_votes"),
        default="number_of_votes",
    )
    mine = serializers.BooleanField(required=False, default=False)
    voted = serializers.BooleanField(required=False, default=False)
