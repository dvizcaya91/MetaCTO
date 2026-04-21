"""Pagination classes for voting endpoints."""

from rest_framework.pagination import PageNumberPagination


class FeaturePagination(PageNumberPagination):
    """Page-number pagination for feature listings."""

    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100
