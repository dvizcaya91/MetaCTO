# Feature Voting System

## Overview

This project is a Feature Voting System that allows users to submit, discover, and prioritize product feature requests.

The goal of the platform is to help product teams collect demand signals from users and identify which feature ideas are most important based on community interest.

## Core User Capabilities

Users should be able to:

- Submit a new feature request with a title and description
- View a list of existing feature requests
- Upvote feature requests submitted by other users
- See vote counts and ranking of feature requests based on popularity

## Product Expectations

The initial version of the system should support a simple and clear workflow:

1. A user creates a feature request by providing a title and description.
2. Other users can browse the existing requests.
3. Users can upvote requests submitted by other users.
4. The system displays feature requests ordered by popularity so the most requested ideas are easy to identify.

The product should emphasize discoverability, transparent vote totals, and straightforward prioritization.

## Architecture

The system will be composed of:

- A Django REST API for backend application logic and HTTP endpoints
- A PostgreSQL database for persistence
- A React web application as the frontend client

The frontend will communicate with the backend over HTTP.

## Tech Stack

- Backend: Django 4.2, Django REST Framework, Simple JWT, django-cors-headers
- Database: PostgreSQL with `pgvector` for embedding storage and similarity search
- Semantic validation: OpenAI embeddings plus `llama-index` integration for duplicate detection
- Frontend: React 19, TypeScript, Vite
- UI and state: Tailwind CSS, Radix UI, Zustand, SWR, React Hook Form, `use-debounce`
- API client: Axios

## Data Modeling

The application data model centers on four core entities:

- `User`: application user record, built on Django's custom `AbstractUser`
- `Feature`: a feature request submitted by a user
- `Vote`: a user's vote on a feature
- `FeatureEmbedding`: canonical text and vector data used for semantic duplicate detection

### `User`

- Extends Django's built-in user model through a custom auth model
- Owns submitted feature requests through `Feature.owner`
- Can vote on features through `Vote.user`

### `Feature`

- Stores the request `title` and `description`
- Tracks the submitting `owner`
- Records timestamps for creation and updates
- Maintains vote counters and activity metadata through `number_of_votes` and `last_voted_at`
- Serves as the primary object displayed in lists, search results, and ranking views

### `Vote`

- Links exactly one `User` to exactly one `Feature`
- Uses a uniqueness constraint on `feature` and `user` to prevent duplicate votes
- Rejects self-votes through domain validation
- Supports vote counting and ranking updates on the related `Feature`

### `FeatureEmbedding`

- Stores a one-to-one embedding record for a `Feature`
- Keeps the canonical text used to generate the embedding
- Persists the embedding vector in PostgreSQL via `pgvector`
- Supports semantic duplicate checks before feature creation

### Relationship Summary

- One `User` can own many `Feature` records
- One `User` can cast many `Vote` records, but only one vote per feature
- One `Feature` can have many `Vote` records
- One `Feature` can have at most one `FeatureEmbedding` record

The data model is intentionally narrow so the product can keep the request, vote, and duplicate-detection flows explicit and easy to reason about.
