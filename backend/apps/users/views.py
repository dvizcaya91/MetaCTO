"""User app views."""

from rest_framework import status, viewsets
from rest_framework.response import Response

from apps.users.serializers import CurrentUserSerializer


class CurrentUserViewSet(viewsets.GenericViewSet):
    """Return the authenticated user's minimal profile."""

    serializer_class = CurrentUserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
