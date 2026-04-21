# Contributing Guide

This document defines how we build, test, review, and ship code in this Django API template.
It is **opinionated** on purpose to keep quality high as the codebase grows.
This project must adhere exactly to the following configuration and conventions. Any deviation is not allowed.

---

## 1) Tech Stack (dev & prod expectations)

* **Python** 3.13.x
* **Django** 5.x LTS, **DRF** 3.x
* **PostgreSQL** 17 (use 16 if already deployed)
* **Gunicorn** (HTTP) with `uvicorn-worker`; **Daphne** only when using Channels/WebSockets
* **drf-spectacular** (+ sidecar) for OpenAPI/Swagger UI
* **pytest + pytest-django**, **model-bakery**, **pytest-cov**
* **Ruff** (lint + format), **mypy + django-stubs**, **pre-commit**

---

## 2) Project Structure & Architecture

**Golden rule:** Views/serializers are thin.

* Put **read** logic in **selectors** (`app/selectors.py`).
* Put **write/business** logic in **services** (`app/services.py`).
* Keep **tasks** (`app/tasks.py`) small and idempotent; call services/selectors inside tasks.
* Keep **services, views, serializers, models and tasks** as directories, with small files inside, instead of big files.

**Recommended layout**

```
api/
  config/settings/ base.py dev.py prod.py __init__.py
  apps/
    users/
      models.py services.py selectors.py serializers.py views.py tasks.py urls.py admin.py
  common/
    pagination.py permissions.py utils.py types.py
  tests/
    users/ test_services.py test_selectors.py test_api.py
  manage.py
requirements/
    base.txt
    loca.txt
    production.txt
local.yml
```

**Responsibilities**

* **Views (DRF ViewSets):** authn/z, request/response wiring, orchestration; *no* business rules.
* **Serializers:** validation + (de)serialization; keep side-effects to a minimum.
* **Selectors:** read-only queries; return `QuerySet`, dataclasses, or dicts. No writes, no side effects.
* **Services:** enforce invariants, own transactions, emit domain events or enqueue tasks via `transaction.on_commit`.
* **Signals:** use sparingly; prefer explicit service calls.

**Example flow**

```
ViewSet → Serializer.validate → Service.perform(...) → (Selector for readback) → Serializer(response)
```

---

## 3) Code Design Principles

* **Single Responsibility:** every function/class does one thing well.
* **Small functions:** target ≤30 lines; extract helpers early.
* **Few parameters:** target ≤4 parameters per function.
* **Pure when possible:** keep business logic pure; isolate I/O at the edges.
* **Type hints everywhere:** public functions and complex internals; keep `mypy` clean.
* **Docstrings:** one-line summary + param/return for public functions and complex queries.
* **Dependency direction:** views → services → selectors (never the reverse).
* **Fail fast:** validate early and raise domain errors; map to DRF errors in the view.

---

## 4) Models & Data Integrity

* Put invariants in the **DB**: `UniqueConstraint`, `CheckConstraint`, proper FKs (`on_delete=PROTECT` when useful).
* Model methods: keep them about *this row*. Cross-aggregate rules go to services.
* Use `TextChoices/IntegerChoices` for enums; avoid magic strings.

---

## 5) Query Design & Performance

**General**

* Always **paginate** list endpoints (no unbounded queries).
* Use `only()`/`defer()` for very wide models; compute frequently used derived fields with `annotate()`.

**Kill N+1**

* `select_related()` for FK/OneToOne; `prefetch_related()` for M2M/OneToMany.
* Prefer `Prefetch(queryset=...)` to prefilter/annotate related sets.
* Add tests with `assertNumQueries` for hot endpoints.

**Indexes**

* Add B-tree indexes for frequent `WHERE` and `ORDER BY` patterns.
* Prefer **multicolumn** indexes that match real filter + order usage.
* Use **partial** indexes for sparse predicates (`WHERE status='active'`).
* Measure with `EXPLAIN (ANALYZE, BUFFERS)` before/after—don’t guess.

**Bulk & concurrency**

* Prefer `bulk_create`/`bulk_update`, `update()`, `F()` expressions, and `exists()` to avoid loading rows.
* Use `select_for_update()` inside short `transaction.atomic()` for contention-sensitive flows.
* For UPSERT-like needs: combine DB constraints with `update()` or `update_or_create()`.

**Advanced**

* Use `Subquery`, `Exists`, `Case/When`, and window functions for heavy lifting in SQL.
* Denormalize carefully for hot aggregates; keep a service to update projections atomically.

---

## 6) Transactions & Side Effects

* Keep transactions **short**; never call external services inside them.
* Group related writes with `transaction.atomic()`.
* Use `transaction.on_commit()` to enqueue Celery tasks so jobs only run after a successful commit.
* Make writes **idempotent** (idempotency keys or unique constraints).

---

## 7) Caching Strategy

* Start with read-through cache on hot selectors; key by stable inputs, set explicit TTLs.
* Invalidate inside the **service** layer (single place that knows writes).
* Cache serialized objects (JSON) rather than ORM instances.
* Be careful with user-scoped data; always namespace keys.

---

## 8) API Design (DRF)

* **Consistency:** choose response envelope style (enveloped or raw) and keep it consistent.
* **Filtering & sorting:** use `django-filter`; whitelist sortable/searchable fields.
* **Pagination:** page/size with sensible caps; include `count`, `next`, `previous`.
* **Errors:** return helpful messages; map domain exceptions to 4xx classes.
* **Rate limiting:** DRF throttling (user/IP), especially on auth endpoints.

---

## 10) Observability, Monitoring & Profiling

**Logging**

* **Structured JSON logs**. Include `request_id`, user id (if any), path, status, duration, DB query count.
* Log levels: `info` for lifecycle, `warning` for recoverable anomalies, `error` for failures. Scrub PII.

**Dev-time tools**


* `silk` for per-request SQL and middleware to catch N+1.
---


## 12) Testing Strategy

**Golden rule:** When asked to create tests, do it for the endpoints and the services (only if the logic is too big and complex), following these guidelines.  

* **Unit tests:** services/selectors isolated (fast).
* **Integration:** API tests via DRF client.
* **DB tests:** invariants/constraints and migrations (data & schema).
* **Performance guards:** `assertNumQueries` for hot endpoints; payload size checks.

**Query budget helper (example)**

```python
from django.test import TestCase
from django.test.utils import CaptureQueriesContext
from django.db import connection

class QueryBudgetTestCase(TestCase):
    def assertMaxQueries(self, max_queries: int):
        return CaptureQueriesContext(connection)

    def test_list_endpoint_query_budget(self):
        with self.assertNumQueries(30):  # budget for this endpoint
            resp = self.client.get('/api/v1/items/')
            assert resp.status_code == 200
```

Run make test command to make sure the tests are correct.


## Checklist
- [ ] Tests added/updated
- [ ] No N+1 (checked with toolbar/silk)
- [ ] Types & docstrings updated
- [ ] OpenAPI updated (`make openapi`)
- [ ] Pre-commit (ruff/format/mypy) passed
```
---
---

## 17) API Documentation (OpenAPI)

* Use `drf-spectacular` annotations/docstrings on views & serializers.
* Regenerate spec locally: `make openapi` → updates `openapi.yaml`.
* Keep examples current and include error responses.
