---
name: solid-python-design
description: Use when working on Python architecture, refactors, class and module boundaries, dependency inversion, or code reviews that should apply SOLID principles to `.py` files.
---

# SOLID Python Design

Use this skill for Python design work where maintainability matters more than short-term convenience. Trigger it when the request mentions SOLID explicitly, or when the code shows large classes, broad conditionals, tight coupling, or extension points that are hard to change safely.

## Workflow

1. Map responsibilities before proposing changes.
   Identify state ownership, side effects, dependencies, extension points, and the public contract that must remain stable.
2. Name the specific SOLID failure, not just "bad design".
   Prefer concrete diagnoses such as "serializer validates and writes to three systems" or "service depends directly on SMTP and Stripe clients".
3. Choose the smallest refactor that improves the seam.
   Favor extracting collaborators, introducing protocols or interfaces, narrowing constructor dependencies, and isolating policy from I/O.
4. Preserve behavior while changing structure.
   Add or extend tests around the seam before broad rewrites when the code is risky or poorly understood.
5. Explain the tradeoff.
   Call out why the new design is easier to extend, test, or substitute, and note any cost in indirection or added types.

## Python-Specific Guidance

- Prefer composition over inheritance unless inheritance expresses a real subtype relationship.
- Use `typing.Protocol` or small abstract base classes when dependency inversion is helpful.
- Keep orchestration code separate from domain rules and data transformations.
- Replace boolean or type-switch branching with strategy objects only when multiple variants already exist or are clearly expected.
- Do not force all five principles into every file. Fix the concrete maintenance problem in front of you.

## Expected Output

- Point to the current coupling or responsibility problem in concrete terms.
- Propose a minimal refactor plan before making sweeping edits.
- Keep public interfaces stable unless the user asks for a breaking redesign.
- If a full refactor is too risky, offer a staged path with test seams and follow-up steps.

## Reference

For detailed review prompts and refactor heuristics, read [references/solid-checklist.md](references/solid-checklist.md).
