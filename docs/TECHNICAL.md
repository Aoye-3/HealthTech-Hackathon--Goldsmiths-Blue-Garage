# ProcureSmart Technical Notes

## Stack
- React + Vite + TypeScript.
- `lucide-react` for icons.
- Static in-memory data for prototype behavior.
- No backend integration in this version.

## Project Structure
- `src/App.tsx`: route selection and shell composition.
- `src/components/layout`: app shell, sidebar, topbar, decision progress, AI assistant.
- `src/components/procurement`: reusable procurement UI components.
- `src/pages`: route-level page composition.
- `src/data/procurementData.ts`: prototype products, reviews, metrics and approval sections.
- `src/utils/routing.ts`: lightweight history navigation and formatting helpers.
- `src/styles.css`: design tokens, layout, component and responsive styles.

## Routing
Routing is intentionally lightweight for the hackathon prototype. `navigateTo()` updates browser history and dispatches a `popstate` event. `App.tsx` maps `window.location.pathname` to a route key and renders the matching page.

Supported routes:
- `/` redirects to `/need-definition`.
- `/need-definition`
- `/shortlist`
- `/compare`
- `/peer-evidence/:productId`
- `/approval-pack`
- `/outcomes`

## State Model
- Shortlist selection is local to `ShortlistPage`.
- Feedback rating, note and submission confirmation are local to `FeedbackForm`.
- Product, evidence, approval and outcomes data are static mock data in `src/data/procurementData.ts`.

## Design Source
The implementation is based on the PRD, transcript notes, FigJam node screenshots and user-provided annotated images. The largest design constraints are:
- NHS deep blue sidebar.
- Consistent right-side AI assistant.
- Persistent decision progress.
- Evidence-led tables and cards.
- Approval pack and outcomes views that support procurement governance, not only product discovery.

## Runbook
Install dependencies:

```bash
npm install
```

Run local development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## Verification Checklist
- Check `/need-definition`, `/shortlist`, `/compare`, `/peer-evidence/surebp-connect`, `/approval-pack`, and `/outcomes`.
- Verify sidebar active state and visual consistency.
- Click from need definition to shortlist, shortlist to comparison, comparison to approval pack.
- Click evidence from a product card.
- Submit outcomes feedback and confirm success message.
- Inspect desktop and mobile widths for text overlap and overflow.
