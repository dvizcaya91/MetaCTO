# React + Vite + TypeScript Checklist

## Architecture

- Does the new code follow the project's routing, state, and styling conventions?
- Should logic live in a component, custom hook, route loader, or API client module?
- Are props and state small enough to reason about?

## Typing

- Are component props and API responses explicitly typed?
- Can UI state be represented as a discriminated union instead of several loose booleans?
- Are nullable and optional states handled intentionally?

## UX

- Are loading, empty, and error states visible and testable?
- Is the interaction keyboard accessible?
- Does the layout still work on small screens?

## Data Fetching

- Is fetch lifecycle state isolated from display components?
- Are retries, cancellation, or stale-data concerns relevant?
- Is optimistic UI safe for this action?

## Vite

- Are environment variables read through `import.meta.env`?
- Do path aliases and asset imports match current config?
- Should the feature be lazily loaded?

## Testing

- One rendering test for the main path
- One failure or empty-state test
- One interaction test for the highest-risk user flow
