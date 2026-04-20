---
name: react-vite-typescript
description: Use when building or reviewing React apps created with Vite and TypeScript, including components, hooks, routes, API clients, state management, styling, tests, and build configuration.
---

# React Vite TypeScript

Use this skill for front-end work in `src/`, `vite.config.*`, `tsconfig*.json`, styling files, and test files where the target stack is React plus Vite plus TypeScript. Trigger it for new features, refactors, routing, async UI flows, state modeling, API integration, or build and typing issues.

## Workflow

1. Read the current stack choices first.
   Identify the router, state library, styling approach, testing setup, path aliases, and API client conventions before adding new structure.
2. Model the data explicitly.
   Define TypeScript types for props, server data, form state, and component contracts before wiring UI behavior.
3. Keep component boundaries clean.
   Split container logic, presentation, and reusable hooks when complexity starts to spread across unrelated concerns.
4. Handle user-facing states deliberately.
   Loading, error, empty, optimistic, and disabled states should be designed, not left implicit.
5. Validate with the real toolchain.
   Run the relevant type check, test suite, or Vite build command if available.

## Vite and React Guidance

- Use `import.meta.env` for environment variables, not Node-specific globals.
- Preserve fast refresh and module boundaries by avoiding overly dynamic module wiring.
- Favor framework-native code splitting and route-level lazy loading when bundle growth is meaningful.
- Use runtime validation for untrusted API responses when the repo already has a pattern or the boundary is risky.
- Keep accessibility, keyboard flow, and semantic HTML in scope for every interactive feature.

## TypeScript Standards

- Prefer precise unions and discriminated unions over loose booleans and optional fields.
- Avoid `any`; use `unknown` plus narrowing when data is not trusted.
- Type async API layers separately from UI state so transport details do not leak through the component tree.

## Reference

Read [references/react-vite-typescript-checklist.md](references/react-vite-typescript-checklist.md) for a deeper implementation and review checklist.
