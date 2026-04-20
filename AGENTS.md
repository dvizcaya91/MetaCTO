# Project Rules
## Prompt Logging
Every time you receive a new instruction or prompt, append it to prompts.txt in the project root with a timestamp (ISO 8601) and a brief summary of what you did in response. Create the file if it doesn't exist. Keep this log updated throughout all sessions.

## Scope
This repository is for a web application platform with a backend and a frontend. The product description, business rules, and feature requirements will live in `README.md` once it exists. Until then, treat `README.md` as the future source of truth for product intent and use this file for engineering and collaboration rules.

## Working Agreement
- Read `README.md` first when it exists, then align implementation decisions with it.
- Prefer small, reviewable changes that preserve existing behavior unless the task explicitly calls for a redesign.
- Do not invent product requirements. If a decision cannot be derived from code, tests, this file, or `README.md`, make the smallest safe assumption and document it.
- Keep the backend and frontend loosely coupled through explicit contracts.
- Update or add tests when behavior changes.

## Repository Structure
- Keep backend code in a dedicated backend area and frontend code in a dedicated frontend area.
- Keep shared schemas, API contracts, or generated types in a clearly named shared location if the project introduces them.
- Keep scripts, tooling, and automation separate from application code.
- Avoid mixing framework setup, domain logic, and infrastructure concerns in the same module when a cleaner boundary is reasonable.

## Backend Expectations
- Design backend code around clear layers: transport, application logic, domain rules, and persistence or integrations.
- Keep request and response contracts explicit and versionable.
- Validate input at the boundary and centralize error translation to HTTP responses.
- Protect security-sensitive paths by default: authentication, authorization, secrets handling, and rate-sensitive operations should be treated as high-risk areas.
- Prefer maintainable, testable abstractions over premature generalization.

## Frontend Expectations
- Build UI code around typed data models, clear component boundaries, and predictable state flow.
- Treat loading, error, empty, and success states as part of the feature, not as follow-up work.
- Keep API access isolated from presentational components where practical.
- Preserve accessibility, keyboard interaction, and responsive behavior as baseline requirements.
- Do not introduce unnecessary dependencies when existing platform or framework features are sufficient.

## API Contract Rules
- Treat backend API shapes as a contract with the frontend.
- When an API changes, update the consuming frontend code and any related tests in the same change whenever feasible.
- Prefer additive API changes over breaking changes unless the task explicitly allows a breaking change.
- Document assumptions around authentication, pagination, filtering, and error payloads close to the code or in the relevant spec.

## Code Quality
- Favor readable, explicit code over clever code.
- Keep modules focused and names concrete.
- Apply SOLID and separation-of-concerns principles where they reduce coupling or improve changeability.
- Match existing project conventions before introducing a new pattern.
- Add comments only when they clarify non-obvious intent, invariants, or tradeoffs.

## Testing And Verification
- Run the most relevant available checks before finishing work: tests, linters, type checks, or builds.
- If a check cannot be run, say so explicitly.
- Add regression coverage for bug fixes when practical.
- Prefer integration tests at system boundaries and focused unit tests for complex business logic.

## Documentation
- Keep `README.md` responsible for product and setup documentation once it exists.
- Keep this file focused on how agents should work in the repository.
- When a change introduces non-obvious architecture or workflow, update the nearest relevant documentation rather than scattering notes.

## Skills
- Use the repo-local skills under `skills/` when relevant:
- `skills/solid-python-design`
- `skills/senior-python-programming`
- `skills/django-rest-framework-api`
- `skills/react-vite-typescript`
- Prefer these skills when the work matches their domain instead of restating the same guidance in each task.


## UI & UX Style guidelines
For styling, refer to file STYLES.md