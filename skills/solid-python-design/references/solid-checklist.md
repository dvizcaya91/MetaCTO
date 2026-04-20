# SOLID Review Checklist

## SRP

- Does this class or module have more than one reason to change?
- Are transport, validation, orchestration, and persistence mixed together?
- Can one responsibility be moved behind a collaborator without changing behavior?

## OCP

- Do new cases require editing a central conditional or branching on string literals?
- Would a strategy, registry, or protocol remove repeated branching cleanly?
- Avoid introducing abstraction for a single implementation with no expected variants.

## LSP

- Do subclasses weaken guarantees, raise unexpected errors, or require caller special cases?
- Would composition avoid invalid subtype behavior?

## ISP

- Are consumers forced to depend on methods or fields they do not use?
- Can a broad service be split into smaller protocols or narrower collaborators?

## DIP

- Does high-level policy depend directly on framework objects, SDK clients, or concrete adapters?
- Can constructor injection or a protocol isolate the dependency?

## Refactor Patterns

- Extract a pure function when logic is mixed with I/O.
- Extract an application service when a view, task, or command object does too much orchestration.
- Introduce a repository or gateway only when persistence or external I/O is polluting domain logic.
- Prefer explicit value objects or typed DTOs when primitives are obscuring intent.

## Review Output Pattern

1. State the current responsibility and coupling problem.
2. Name the affected SOLID principle.
3. Propose the smallest safe refactor.
4. Mention the tests needed to lock behavior before and after the change.
