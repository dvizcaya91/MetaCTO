"""Views for feature creation, listing, and voting workflows."""

from django.http import Http404
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.voting.domain import VotingDomainError
from apps.voting.pagination import FeaturePagination
from apps.voting.serializers import (
    FeatureCreateSerializer,
    FeatureListQuerySerializer,
    FeatureSerializer,
)
from apps.voting.services import (
    create_feature,
    get_feature_for_user,
    get_feature_queryset_for_user,
    list_features,
    unvote_feature,
    vote_for_feature,
)


class FeatureViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    """Feature list, create, vote, and unvote endpoints."""

    pagination_class = FeaturePagination

    def get_permissions(self):
        if self.action == "list":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == "create":
            return FeatureCreateSerializer

        return FeatureSerializer

    def get_queryset(self):
        if self.action == "list":
            params_serializer = FeatureListQuerySerializer(data=self.request.query_params)
            params_serializer.is_valid(raise_exception=True)
            params = params_serializer.validated_data

            if (params["mine"] or params["voted"]) and not self.request.user.is_authenticated:
                raise NotAuthenticated("Authentication credentials were not provided.")

            return list_features(user=self.request.user, **params)

        return get_feature_queryset_for_user(user=self.request.user)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        feature = create_feature(owner=request.user, **serializer.validated_data)
        feature = get_feature_for_user(user=request.user, feature_id=feature.id)

        response_serializer = FeatureSerializer(
            feature,
            context=self.get_serializer_context(),
        )
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def vote(self, request, pk=None):
        feature = self._get_feature_or_404(pk)

        try:
            updated_feature = vote_for_feature(feature_id=feature.id, user=request.user)
        except VotingDomainError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        serialized_feature = FeatureSerializer(
            get_feature_for_user(user=request.user, feature_id=updated_feature.id),
            context=self.get_serializer_context(),
        )
        return Response(serialized_feature.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def unvote(self, request, pk=None):
        feature = self._get_feature_or_404(pk)

        try:
            updated_feature = unvote_feature(feature_id=feature.id, user=request.user)
        except VotingDomainError as exc:
            return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)

        serialized_feature = FeatureSerializer(
            get_feature_for_user(user=request.user, feature_id=updated_feature.id),
            context=self.get_serializer_context(),
        )
        return Response(serialized_feature.data, status=status.HTTP_200_OK)

    def _get_feature_or_404(self, feature_id):
        try:
            return self.get_queryset().get(pk=feature_id)
        except self.get_queryset().model.DoesNotExist as exc:
            raise Http404 from exc
