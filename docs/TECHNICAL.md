# ProcureSmart Technical Overview

## Purpose
ProcureSmart is currently a frontend-first hackathon prototype for NHS primary care procurement workflows. The implemented app demonstrates the full user journey from clinical need definition through product comparison, peer evidence, approval pack generation, and outcomes feedback.

The next technical milestone is a minimum viable backend that can validate whether an AI-assisted API can analyse a clinical procurement prompt, filter product data, return product-specific peer evidence, and support decision-making without turning the product into a clinical diagnosis or prescribing tool.

## Current Implementation Status
- Frontend: implemented.
- Static product, product-specific peer evidence, and clinician review detail data: implemented.
- Backend API: planned, not implemented.
- AI provider integration: planned, not implemented.
- Database or external NHS data integration: planned, not implemented.

## Current Stack
- React 19
- Vite 7
- TypeScript 5.8
- `lucide-react` for icons
- Static in-memory data in `src/data/procurementData.ts`
- Lightweight browser-history routing in `src/utils/routing.ts`
- Playwright available for rendered UI verification

## Current Evidence Model
Peer evidence is keyed by product ID through `ProductEvidenceProfile` records in `src/data/procurementData.ts`. Each profile contains adoption map data, evidence metrics, and a list of verified `Review` records. Review cards link to `/peer-evidence/:productId/reviews/:reviewId`, where the detail page renders the selected review, related product facts, structured review breakdown, relevance signals, reported impact, limitations, and suggested approval evidence.

The review detail shape is represented by optional `ReviewDetail` fields on each review. The frontend provides fallback detail data where static reviews do not yet include expanded review detail, so future API or JSON data can be introduced incrementally.

## Current Assistant Context Model
The right-side AI Procurement Assistant is a single shell-level component, not a page-owned widget. `AppShell` renders `AIAssistantPanel` once, and the panel reads all route-specific assistant content from `buildAssistantContext(route)` in `src/data/assistantContext.ts`.

`AssistantContext.conversationScope` is the reserved persistence key for future backend chat history. Current prototype scopes use `procurement-workflow:${route}`. Page routes may provide product or review metadata to a future API, but they should not create independent chatbot state or duplicate assistant rendering.

## Planned MVP Backend Stack
- Node.js + TypeScript
- Minimal API service for need analysis, product filtering, product-specific evidence, clinician review details, persisted assistant messages, and comparison recommendations
- AI provider abstraction with OpenAI as the default candidate provider
- Mock provider fallback for local demos and API-key-free frontend integration
- Product data initially reused from the current frontend data shape, then migrated to JSON or database storage when needed

## Documentation Index
- [Frontend Architecture](./FRONTEND.md)
- [MVP Backend Plan](./BACKEND.md)
- [API Contract Draft](./API.md)
- [AI Integration Plan](./AI-INTEGRATION.md)
- [Runbook](./RUNBOOK.md)
- [Documentation Maintenance](./DOCUMENTATION.md)

## Source Documents
- `PRD.md`: product workflow, user goals, and route-level acceptance criteria.
- `DESIGN.md`: NHS visual direction, layout rules, component expectations, and interaction principles.
- `docs/*`: technical architecture, implementation notes, and future integration contracts.

## Design and Safety Constraints
- The product is a procurement decision-support tool, not a clinical diagnosis or prescribing system.
- AI output must be presented as procurement filtering and rationale support only.
- User-facing AI decisions should require clinician or procurement lead review.
- NHS-reviewed evidence, peer adoption, pricing transparency, and approval governance remain the core product signals.
