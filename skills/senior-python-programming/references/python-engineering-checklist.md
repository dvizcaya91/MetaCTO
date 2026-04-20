# Python Engineering Checklist

## Design

- Is the change consistent with the repo's architecture and naming?
- Are functions small enough to test and reason about?
- Are responsibilities split between domain logic, I/O, and orchestration?

## Typing

- Are public APIs fully annotated?
- Can ambiguous dictionaries become typed models or typed mappings?
- Is `Optional` only used where `None` is a real state?

## Errors

- Are errors specific and contextual?
- Is retry logic only applied to operations that are actually safe to retry?
- Are framework or transport exceptions translated at the boundary?

## Data and Performance

- Is the code doing unnecessary repeated work, N+1 queries, or large in-memory transformations?
- Are streaming, batching, or pagination needed?
- Is caching justified and scoped correctly?

## Testing

- Does the change cover the happy path, failure path, and one meaningful edge case?
- Are tests asserting behavior instead of implementation detail?
- If a bug was fixed, is there a regression test?

## Review Output Pattern

1. Explain the highest-risk issue first.
2. State the operational or maintenance consequence.
3. Suggest a concrete rewrite, additional test, or boundary adjustment.
