# obix-counter

A small counter demo implemented with **HTML + CSS + JS**, bundled with **Rollup** and served via **browser-sync**.

## Documentation review (obix_docs)

The implementation follows the same structure described in the OBIX API docs:

- **Initial state + named transitions** (`increment`, `decrement`, etc.).
- **Adapter-style API** with `getState()` and `applyTransition(name, payload)`.
- **Lifecycle-style hooks** (`onUpdate`) to track transition activity.

Reference docs used:

- `obix_docs/api/reference/PLAN.md` (functional counter transitions and trigger model)
- `obix_docs/api_design.md` (adapter interface concept)

## Counter behavior in this example

- `increment`: increases count by the current step.
- `decrement`: decreases count by the current step.
- `setStep`: updates the step from input.
- `reset`: returns count to 0.

## Run locally

```bash
npm install
npm run build
npm run dev
```

Then open the browser-sync URL (usually `http://localhost:3000`).
