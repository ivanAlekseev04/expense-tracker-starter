# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install        # install dependencies (bun is preferred over npm here)
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build
npm run lint       # ESLint check
npm run preview    # preview production build
```

No test suite is configured.

## Architecture

This is a single-component React app (`src/App.jsx`). All state and logic live in `App` — there are no child components, no routing, and no external state library.

**Transaction shape:**
```js
{ id, description, amount, type: "income"|"expense", category, date }
```
`amount` is stored as a string (from input value), which causes a bug: the summary totals use `.reduce()` but produce string concatenation instead of arithmetic.

**Categories** are a fixed array defined in `App`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**Filtering** is derived inline in render by chaining `.filter()` on the `transactions` state array based on `filterType` and `filterCategory`.

Styles are in `src/App.css` with flat class names. A `.delete-btn` class exists in CSS but the delete button is not yet rendered in the table — it is a planned feature.

This project is a learning exercise: it intentionally has a known bug (string `amount` arithmetic), missing delete functionality, and no extracted components.
