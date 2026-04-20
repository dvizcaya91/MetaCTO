---
name: senior-python-programming
description: Use when implementing or reviewing Python backends, libraries, scripts, and services that need senior-level decisions around structure, typing, testing, error handling, and maintainability.
---

# Senior Python Programming

Use this skill for non-trivial Python work in `.py`, `pyproject.toml`, test files, or service code where the goal is production-quality engineering rather than a quick patch. It is especially relevant for refactors, backend features, concurrency, data modeling, API integrations, and code review.

## Workflow

1. Read the local conventions first.
   Inspect the project layout, typing style, test patterns, dependency management, and framework choices before introducing a new pattern.
2. Design for clarity before cleverness.
   Favor explicit names, small units with obvious contracts, and predictable control flow.
3. Make types carry meaning.
   Add annotations to public functions, data models, and boundary objects. Tighten ambiguous `dict` and `Any` usage where it materially improves safety.
4. Keep side effects at the edges.
   Separate parsing, validation, domain logic, persistence, and transport concerns when possible.
5. Verify the change.
   Run the most relevant tests, type checks, or linters that exist in the repo and report what was or was not validated.

## Implementation Standards

- Prefer standard library features before adding dependencies unless the repo already uses a library for that concern.
- Use dataclasses, typed dictionaries, pydantic models, or framework-native models based on existing project conventions.
- Raise precise exceptions at boundaries and convert them to user-facing errors in one place.
- Be deliberate about sync vs. async code. Do not mix them casually.
- Optimize only after identifying the real hot path, query issue, or memory pressure.

## Review Standards

- Flag hidden shared state, weak typing, broad exception handling, leaky abstractions, and untested edge cases.
- Prefer actionable findings with a safer alternative, not generic style commentary.
- Preserve backwards compatibility unless the task explicitly allows breaking changes.

## Reference

Read [references/python-engineering-checklist.md](references/python-engineering-checklist.md) for detailed implementation and review prompts.
