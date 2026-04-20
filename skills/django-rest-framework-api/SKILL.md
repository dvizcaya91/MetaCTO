---
name: django-rest-framework-api
description: Use when building or reviewing Django REST Framework views, viewsets, serializers, permissions, routers, filtering, pagination, authentication, and API tests in Django projects.
---

# Django REST Framework API

Use this skill for Django and DRF work across `views.py`, `serializers.py`, `permissions.py`, `urls.py`, tests, and related service layers. Trigger it for new endpoints, serializer refactors, auth and permission changes, query optimization, response contract changes, or API review.

## Workflow

1. Start from the contract.
   Clarify request shape, response shape, authentication, permissions, pagination, filtering, and error behavior before changing code.
2. Pick the right DRF abstraction.
   Use `ViewSet` or generic views when the resource fits them cleanly. Prefer `APIView` or a custom action when the endpoint is not standard CRUD.
3. Keep responsibilities separated.
   Serializers should validate and shape data. Views should orchestrate HTTP concerns. Domain rules and cross-system workflows should live outside serializers and views when they grow complex.
4. Watch the database.
   Audit queryset scope, `select_related`, `prefetch_related`, pagination, and permission filtering so the API is both safe and efficient.
5. Validate the endpoint end to end.
   Cover auth, permission denial, validation errors, and success cases with API tests.

## DRF-Specific Guidance

- Use explicit serializer fields for public APIs when model shape and API shape diverge.
- Keep `get_queryset()` tenant-aware and permission-aware.
- Avoid business logic in `to_representation()` unless the transformation is strictly presentation logic.
- Use serializer validation for request data integrity, not for side-effect-heavy workflows.
- Be explicit about status codes, especially for create, delete, bulk, and async workflows.

## Expected Output

- Describe the API contract and any backward-compatibility impact.
- Call out auth, permissions, and queryset risks early.
- Prefer narrowly scoped endpoint changes over broad framework rewrites.
- If performance is a concern, mention the exact query or serialization hotspot.

## Reference

Read [references/drf-endpoint-checklist.md](references/drf-endpoint-checklist.md) for a deeper endpoint checklist.
