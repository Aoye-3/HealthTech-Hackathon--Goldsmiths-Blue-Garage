# Frontend Architecture

## Status
Implemented as a local React prototype.

## Framework
The frontend uses React 19, Vite 7, and TypeScript. It is intentionally lightweight for hackathon speed: routing, data, and state are implemented locally without a backend client, global state library, or router package.

## Application Structure
- `src/App.tsx`: maps the browser path to a route key, owns high-level route state, and composes the app shell.
- `src/components/layout`: shared application chrome, including sidebar, topbar, decision progress, and AI assistant panel.
- `src/components/procurement`: reusable procurement UI components such as product cards, comparison table, evidence cards, metrics, approval status, and feedback form.
- `src/pages`: route-level screens for need definition, shortlist, comparison, peer evidence, approval pack, and outcomes.
- `src/data/procurementData.ts`: static prototype data for products, clinical need text, evidence, outcome metrics, and approval sections.
- `src/utils/routing.ts`: lightweight navigation helpers using `window.history.pushState`.
- `src/styles.css`: design tokens, layout rules, component styles, and responsive behavior.

## Routing
Routing is intentionally implemented without React Router. `getRouteKey()` maps the current path to a `RouteKey`, and `navigateTo()` updates browser history before dispatching a `popstate` event.

Supported prototype routes:
- `/` redirects to `/need-definition`
- `/need-definition`
- `/shortlist`
- `/compare`
- `/peer-evidence/:productId`
- `/approval-pack`
- `/outcomes`

## State Model
- Need analysis state is local to `App.tsx` and `NeedDefinitionPage`.
- Shortlist selection is local to `ShortlistPage`.
- Outcomes feedback state is local to `FeedbackForm`.
- Product and evidence data currently come from static TypeScript arrays.

## Current AI-Like Frontend Behavior
The frontend simulates AI-assisted procurement flows with deterministic local logic:
- Need definition extracts filters from the prompt.
- Product shortlist uses static products and local selection state.
- Product comparison uses static product data and deterministic recommendation copy.
- AI assistant panels provide page-specific summary text.

## Future API Migration Points
- `NeedDefinitionPage`: move prompt analysis and filter generation to `POST /api/need/analyse`.
- `NeedDefinitionPage`: move clarification updates to `POST /api/need/refine`.
- `ShortlistPage`: replace direct static product reads with `POST /api/products/filter`.
- `ComparePage`: move recommendation rationale to `POST /api/compare/recommend`.
- Shared API helper: add a small `fetch` wrapper only when backend integration begins.

## Frontend Constraints for MVP Integration
- Keep the app usable without a backend during demos.
- Do not introduce global state management unless multiple routes need shared server state.
- Do not introduce a backend client library for the first MVP; use `fetch` or a small typed helper.
- Keep static mock data as a fallback until the backend product filtering is verified.

## Verification
Run:

```bash
npm.cmd run build
```

For rendered smoke testing, start the app and verify:
- `/need-definition` loads.
- The need definition flow enters AI clarification state.
- Confirmed filters can continue to `/compare`.
- Sidebar navigation reaches each route.
- Text does not overlap on desktop or mobile widths.
