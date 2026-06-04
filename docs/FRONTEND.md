# Frontend Architecture

## Status
Implemented as a local React prototype.

## Framework
The frontend uses React 19, Vite 7, and TypeScript. It is intentionally lightweight for hackathon speed: routing, data, and state are implemented locally without a backend client, global state library, or router package.

## Application Structure
- `src/App.tsx`: maps the browser path to a route key, owns high-level route state, and composes the app shell.
- `src/components/layout`: shared application chrome, including sidebar, topbar, decision progress, and AI assistant panel.
- `src/components/procurement`: reusable procurement UI components such as product cards, product stack/detail views, shortlist decision panel, comparison table, evidence cards, review scroller, metrics, approval status, and feedback form.
- `src/pages`: route-level screens for need definition, shortlist, comparison, peer evidence, clinician review detail, approval pack, and outcomes.
- `src/data/assistantContext.ts`: single source for route-specific assistant copy, actions, product CTAs, clean mode, and future conversation scope keys.
- `src/data/procurementData.ts`: static prototype data for products, clinical need text, evidence, outcome metrics, and approval sections.
- `src/utils/routing.ts`: lightweight navigation helpers using `window.history.pushState`.
- `src/styles.css`: design tokens, layout rules, component styles, and responsive behavior.

## Routing
Routing is intentionally implemented without React Router. `getRouteKey()` maps the current path to a `RouteKey`, and `navigateTo()` updates browser history before dispatching a `popstate` event.

Supported prototype routes:
- `/` redirects to `/need-definition`
- `/need-definition`
- `/shortlist`
- `/shortlist/:productId`
- `/compare`
- `/peer-evidence/:productId`
- `/peer-evidence/:productId/reviews/:reviewId`
- `/approval-pack`
- `/outcomes`

Route ownership:
- `/shortlist` owns first-round ProductList review and local comparison selection state.
- `/shortlist/:productId` owns the selected product detail view and entry points into second-round comparison or peer evidence.
- `/compare` remains a second-round quote/evidence comparison route with local mock shortlist fallback.
- `/peer-evidence/:productId` renders evidence for the product identified in the URL.
- `/peer-evidence/:productId/reviews/:reviewId` renders a clinician review detail subpage for the selected product and review. It is still part of the peer evidence workflow; the progress indicator keeps Peer evidence active. The AI assistant panel is intentionally clean on this subpage and only keeps the input surface until future behavior is defined.

## ProductList Data Shape
Product shortlist and detail cards render NHS catalogue-style item fields rather than generic product marketing copy. The frontend expects each `Product` to include:
- catalogue identity: `catalogueCode`, `mpc`, `gtin`
- fulfilment fields: `unitOfIssue`, `leadTime`, `returnStatus`
- procurement classification: `category`, `clinicalArea`, `productType`, `size`
- supplier identity: `brand`, `supplier`
- evidence/comparison metrics: price, benchmark range, organisations using it, reviews, clinician score, fit score, annual cost

This keeps the ProductList ready for a backend catalogue feed without changing the card components.

## Evidence Data Shape
Peer evidence is product-specific and is not treated as a single global evidence page. The current static data models the future API shape with `ProductEvidenceProfile` records keyed by product ID:

- `productId`: product identifier matching `Product.id`
- `organisationName`, `evidenceTitle`, `evidenceSummary`: page-level evidence context
- `mapTitle`, `mapSubtitle`, `activeLeads`, `pins`: adoption map display data
- `credibilityScore`, `credibilityReviewCount`, `verifiedUsers`: evidence summary metrics
- `reviews`: list of clinician `Review` records for that product

Each `Review` has a stable `id` used in the review detail URL, plus reviewer identity, organisation, rating, quote, verification flag, and optional `detail` data.

`ReviewDetail` supports the clinician review detail page without hard-coding a single doctor profile:

- `confidence` and `evidenceStrength`
- `usagePeriod`, `clinicalSetting`, `productUse`, `relevantPathway`
- structured `breakdown` rows
- `relevanceScore` and `relevanceReasons`
- `impactMetrics`
- `limitations`
- `approvalEvidence`

The frontend uses fallback values when optional `review.detail` is missing, so existing static records can render while future product-specific review details are added incrementally.

## State Model
- Need analysis state is local to `App.tsx` and `NeedDefinitionPage`.
- Shortlist selection is local to `ShortlistPage`.
- Product detail and peer evidence pages derive the product ID from the URL and read static product data until backend integration begins.
- Clinician review detail pages derive both product ID and review ID from the URL and read the matching review from `productEvidenceProfiles[productId].reviews`.
- `ReviewScroller` owns local scroll position for the horizontal clinician review list. Review cards only handle click navigation; horizontal movement is controlled by the floating slider to keep click and drag behavior separate.
- Outcomes feedback state is local to `FeedbackForm`.
- Product and evidence data currently come from static TypeScript arrays.

## Current AI-Like Frontend Behavior
The frontend simulates AI-assisted procurement flows with deterministic local logic:
- Need definition extracts filters from the prompt.
- Product shortlist uses static products, stacked review controls, local selection state, and detail routes.
- Product comparison uses a three-product local shortlist fallback and deterministic recommendation copy. This keeps the comparison matrix aligned to the MVP requirement for side-by-side quote/evidence review while the wider catalogue remains available to ProductList.
- The AI assistant is rendered once by `AppShell` through `AIAssistantPanel`.
- `AIAssistantPanel` is a rendering component only. It reads route-specific assistant state from `buildAssistantContext(route)` in `src/data/assistantContext.ts`.
- Page components should not render independent chatbot panels, own assistant prompts, or duplicate assistant action sources.
- `AssistantContext.conversationScope` is the stable key reserved for future chat persistence. The current format is `procurement-workflow:${route}`.
- The clinician review detail route uses assistant `mode: "clean"` so the right panel keeps only the header and input surface until review-specific assistant behavior is defined.

## Assistant Data Shape
`AssistantContext` is the frontend boundary for all assistant panel state:

- `route`: current route key.
- `conversationScope`: persistence key for future message history.
- `mode`: `standard` for message/action panels or `clean` for input-only panels.
- `primaryMessage` and `secondaryMessages`: deterministic display copy for the current route.
- `actions`: button or navigation actions displayed by the panel.
- `productCta`: optional product evidence entry point used by the shortlist assistant.
- `decisionCard`: optional decision workflow card used by the shortlist assistant.

Future backend chat integration should hydrate this shape or a compatible equivalent before rendering. This keeps visual presentation separate from assistant context and avoids route pages becoming isolated chatbot implementations.

## Future API Migration Points
- `NeedDefinitionPage`: move prompt analysis and filter generation to `POST /api/need/analyse`.
- `NeedDefinitionPage`: move clarification updates to `POST /api/need/refine`.
- `ShortlistPage`: replace direct static product reads with `POST /api/products/filter`.
- `ShortlistPage`: move local selected product IDs to backend/session state when cross-route persistence is required.
- Product detail routes: load product facts from `GET /api/products/:productId` when backend product detail is available.
- `PeerEvidencePage`: load peer review and adoption data from `GET /api/products/:productId/evidence` when implemented.
- `ClinicianReviewPage`: load review detail from `GET /api/products/:productId/evidence/reviews/:reviewId` when implemented, or from the product evidence response if the backend returns expanded reviews.
- `ComparePage`: move recommendation rationale to `POST /api/compare/recommend`.
- `AIAssistantPanel`: replace static `buildAssistantContext(route)` values with persisted assistant context and messages from `POST /api/assistant/messages` or a compatible backend service.
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
- Confirmed filters can continue to `/shortlist`.
- Product details can be opened from `/shortlist/:productId`.
- Product-specific peer evidence can be opened from `/peer-evidence/:productId`.
- Clinician review details can be opened from `/peer-evidence/:productId/reviews/:reviewId`.
- The assistant panel appears once per page shell and exposes one `data-conversation-scope` value.
- Sidebar navigation reaches top-level workspace routes.
- Text does not overlap on desktop or mobile widths.
