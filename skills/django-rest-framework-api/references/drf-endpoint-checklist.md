# DRF Endpoint Checklist

## Contract

- What are the request fields, response fields, and status codes?
- Is the endpoint list, detail, action, or workflow oriented?
- Does it need pagination, filtering, ordering, or idempotency rules?

## Security

- Which authentication classes apply?
- Which permission classes apply?
- Does the queryset restrict objects to the current tenant, organization, or user?

## Serialization

- Should validation live in field validators, `validate()`, or a service layer?
- Are write serializers and read serializers different enough to split?
- Are nested writes truly needed, and are they tested?

## Query Efficiency

- Does the endpoint cause N+1 queries?
- Should related objects be selected or prefetched?
- Is pagination required to protect the database and response size?

## Testing

- Authenticated success case
- Unauthenticated or unauthorized case
- Validation failure case
- One edge case around filtering, pagination, or object ownership

## Review Output Pattern

1. State the contract risk or correctness issue.
2. Note the security or performance consequence.
3. Recommend the smallest DRF-native fix.
