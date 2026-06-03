# ProcureSmart Runbook

## Local Setup
Install dependencies:

```bash
npm install
```

## Quick Start on Windows
Run:

```bat
start-dev.bat
```

Expected behavior:
- The script checks that `node_modules` exists.
- Vite starts on `http://127.0.0.1:3000`.
- The primary demo route is `http://127.0.0.1:3000/need-definition`.

## Manual Start
Run:

```bash
npm.cmd run dev:local
```

Or use the default Vite command:

```bash
npm.cmd run dev
```

## Build
Run:

```bash
npm.cmd run build
```

Expected result:
- TypeScript project build passes.
- Vite production bundle is generated in `dist/`.

## Preview Production Build
Run:

```bash
npm.cmd run preview
```

## Demo Flow
1. Open `/need-definition`.
2. Review the clinical need input and recommended procurement pathway.
3. Click the send button to enter AI clarification state.
4. Mark extracted filters as correct or wrong.
5. Continue to product comparison.
6. Navigate through product comparison, peer evidence, approval pack, and outcomes.

## Key Routes
- `/need-definition`
- `/shortlist`
- `/compare`
- `/peer-evidence/surebp-connect`
- `/approval-pack`
- `/outcomes`

## Frontend Smoke Checklist
- App loads without a framework error overlay.
- Sidebar active state matches the route.
- Need definition can enter clarification state.
- Filter confirmation can continue to comparison.
- Product cards can be selected or deselected.
- Comparison page highlights the recommended product.
- Outcomes feedback can be submitted.
- Desktop and mobile layouts remain readable.

## Backend Status
No backend server exists yet. Backend MVP behavior is documented in:
- [MVP Backend Plan](./BACKEND.md)
- [API Contract Draft](./API.md)
- [AI Integration Plan](./AI-INTEGRATION.md)

## Troubleshooting

### `node_modules` is missing
Run:

```bash
npm install
```

### Port 3000 is already in use
Stop the existing process or start Vite with a different port:

```bash
npm.cmd run dev -- --host 127.0.0.1 --port 3001
```

### Build fails
Run `npm.cmd run build` again and inspect TypeScript errors first. Most prototype failures are caused by mismatched component props or stale imports after UI changes.
