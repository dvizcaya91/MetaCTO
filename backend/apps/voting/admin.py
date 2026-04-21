from django.contrib import admin

from apps.voting.models import Feature, Vote


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ("title", "owner", "number_of_votes", "created_at", "last_voted_at")
    search_fields = ("title", "description", "owner__username")
    list_filter = ("created_at", "last_voted_at")


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ("feature", "user", "created_at")
    search_fields = ("feature__title", "user__username")
    list_select_related = ("feature", "user")
