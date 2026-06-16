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

React + Vite app with no router and no external state library. There are four components, all in `src/`:

```
App             — owns transactions state; passes it down via props
├── Summary     — receives transactions, computes and displays totals
├── TransactionForm — owns its own form state; calls onAdd(transaction) on submit
└── TransactionList — owns filter state; derives filtered view from transactions prop
```

**Files:**
- `src/main.jsx` — entry point; mounts `<App>` into `#root`.
- `src/App.jsx` — root component. Holds the `transactions` array in state, defines the `categories` constant, and wires `handleAdd` as the `onAdd` callback for `TransactionForm`.
- `src/Summary.jsx` — computes `totalIncome`, `totalExpenses`, and `balance` from the `transactions` prop and renders the three summary cards.
- `src/TransactionForm.jsx` — controlled form with its own local state for each field. On submit it builds a transaction object (with `parseFloat` on amount) and calls `onAdd`, then resets the fields.
- `src/TransactionList.jsx` — holds `filterType` and `filterCategory` in local state. Derives the visible rows by filtering the `transactions` prop, then renders the filter dropdowns and the table.

**State ownership:**
- `transactions` array lives in `App` and is the single source of truth.
- Form fields (description, amount, type, category) are local state in `TransactionForm`.
- Filter selections (filterType, filterCategory) are local state in `TransactionList`.

**Transaction shape:**
```js
{ id, description, amount, type: "income"|"expense", category, date }
```
`amount` is always a number. `TransactionForm` applies `parseFloat` when building the object from the text input.

**Categories** are a module-level constant in `App.jsx`, passed as a prop to both `TransactionForm` and `TransactionList`.

Styles are in `src/App.css` with flat class names (`.income-amount`, `.expense-amount`, `.balance-amount`, etc.). A `.delete-btn` class exists in CSS but the delete button is not yet implemented.

This project is a learning exercise — delete functionality is a known missing feature.
