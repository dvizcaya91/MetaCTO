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

## Mandatory Setup

This project must adhere exactly to the following configuration and conventions. Any deviation is not allowed.
1. Framework & Tooling
   - React (v19.1) generated with Vite
   - TypeScript throughout. Everything should be typed and you should avoid using elements of type any
   - React Router (v7.6) for client-side routing
   - State management with Zustand (v5.0)

### Styling
2. Tailwind CSS v4
   - No other CSS frameworks
3. For icons, use lucid icons library

### Architecture & Organization
4. Atomic Design
   - `atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/` under `src/components/`
5. Feature-Based Hooks
   - All custom hooks live in `src/hooks/{feature}/`
   - Keep hook logic decoupled from UI
6. API Layer
   - Axios (v1.10) + SWR (v2.3) for data fetching, caching & revalidation
   - Two wrappers (`apiPrivate.ts`, `apiPublic.ts`) for shared Axios config
   - For mockup data, use SWR with fallbackData
7. Type Definitions
   - `src/interfaces/{feature}/` for all TypeScript interfaces & types. All interfaces must start with capital I

### Component & UX Requirements
8. Components
   - Use shadcn as the base library for components.
   - Whenever there is a search component, use use-debounce library to delay the call to the API
9. Data-Loading Components
   - Always include a `loading` state
   - Render a lightweight skeleton loader while fetching
10. Forms
   - Use a single `useForm` hook instance per form
   - Centralize validation & error handling so all forms behave consistently
11. Language
   - Use react-i18next for multilanguage support. Every text in the platform must come from this


### Naming & Conventions
12. Language & Style
   - All identifiers in English
   - Follow established JS/TS naming (camelCase for variables/functions, PascalCase for components/types/files, CAPITAL_SNAKE_CASE for global variables) 
   - For functions definitions use arrow syntax


### Validations
13. The platform should pass the lint validation
14. Before finishing, run `npm run build` to make sure everything is working

## Reference

Read [references/react-vite-typescript-checklist.md](references/react-vite-typescript-checklist.md) for a deeper implementation and review checklist.
