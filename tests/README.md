# Unit tests

Install the locked dependencies with `yarn install --frozen-lockfile`, then run:

```sh
yarn test
yarn test:watch
```

Vitest runs only `tests/**/*.test.ts` and `tests/**/*.test.tsx`, so the existing Cypress recordings are not included. React tests use jsdom and mocked API services; they never call the live backend.

Regression coverage:
- Edit URLs remain updates after context resets on refresh.
- New entries and sales created from existing purchases remain inserts.
- Edits cannot be submitted before their payload loads.
- Installment lookup handles blank, missing and numeric document IDs, and ignores stale responses.
- Purchase and down-payment totals render in their correct columns.

Backend profit-query tests live in the backend repository under `tests/dashboard-profit.php`.
