"""Voting URL routes."""

from django.urls import path

from apps.voting.views import FeatureViewSet


app_name = "voting"

urlpatterns = [
    path("features/", FeatureViewSet.as_view({"get": "list", "post": "create"}), name="feature-list"),
    path(
        "features/<int:pk>/vote/",
        FeatureViewSet.as_view({"post": "vote"}),
        name="feature-vote",
    ),
    path(
        "features/<int:pk>/unvote/",
        FeatureViewSet.as_view({"post": "unvote"}),
        name="feature-unvote",
    ),
]
