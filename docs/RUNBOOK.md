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
5. Continue to Product Shortlist.
6. Open a product detail card from the ProductList stack.
7. Add products to comparison and continue to second-round comparison.
8. Review product-specific peer evidence.
9. Use the review slider to browse verified clinician reviews.
10. Open a clinician review detail page from a review card, then return to peer evidence.
11. Continue to approval pack and outcomes.

## Key Routes
- `/need-definition`
- `/shortlist`
- `/shortlist/surebp-connect`
- `/compare`
- `/peer-evidence/surebp-connect`
- `/peer-evidence/surebp-connect/reviews/sarah-jenkins`
- `/approval-pack`
- `/outcomes`

## Frontend Smoke Checklist
- App loads without a framework error overlay.
- Sidebar active state matches the top-level workspace route.
- Need definition can enter clarification state.
- Filter confirmation can continue to Product Shortlist.
- Product cards can be selected or deselected.
- ProductList supports left/right product review and product detail navigation.
- Product detail links to peer evidence for the selected product.
- Peer evidence renders product-specific evidence profile data.
- Verified clinician review cards can open review detail subroutes.
- The review detail subroute keeps the AI assistant panel clean until future behavior is implemented.
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
