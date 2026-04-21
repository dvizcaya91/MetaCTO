from django.contrib import admin
from django.db.models import Exists, OuterRef

from apps.voting.models import Feature, FeatureEmbedding, Vote


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "owner",
        "has_embedding",
        "number_of_votes",
        "created_at",
        "last_voted_at",
    )
    search_fields = ("title", "description", "owner__username")
    list_filter = ("created_at", "last_voted_at")
    list_select_related = ("owner",)

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.annotate(
            has_embedding=Exists(
                FeatureEmbedding.objects.filter(feature_id=OuterRef("pk")),
            ),
        )

    @admin.display(boolean=True, ordering="has_embedding", description="Has embedding")
    def has_embedding(self, obj):
        return obj.has_embedding


@admin.register(FeatureEmbedding)
class FeatureEmbeddingAdmin(admin.ModelAdmin):
    list_display = ("feature", "canonical_text", "created_at", "updated_at")
    search_fields = ("feature__title", "canonical_text")
    list_select_related = ("feature",)


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ("feature", "user", "created_at")
    search_fields = ("feature__title", "user__username")
    list_select_related = ("feature", "user")
