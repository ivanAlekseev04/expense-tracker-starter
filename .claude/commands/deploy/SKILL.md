# Deploy to Staging

Run tests, build the production bundle, and push to staging.

## Steps

1. **Run tests** — execute the project's test suite and abort if any test fails.
2. **Build** — run the production build and abort if the build fails.
3. **Push to staging** — push the current branch to the `staging` remote branch.

## Instructions

Run the following commands in sequence, stopping immediately if any step fails:

```bash
npm run lint && npm run build && git push origin HEAD:staging
```

Report the result of each step clearly:
- If lint fails, show the ESLint output and stop.
- If build fails, show the build error and stop.
- If the push succeeds, confirm the branch was pushed to staging.

This project has no test suite configured (see CLAUDE.md), so linting serves as the quality gate instead.
