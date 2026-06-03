# ProcureSmart Technical Overview

## Purpose
ProcureSmart is currently a frontend-first hackathon prototype for NHS primary care procurement workflows. The implemented app demonstrates the full user journey from clinical need definition through product comparison, peer evidence, approval pack generation, and outcomes feedback.

The next technical milestone is a minimum viable backend that can validate whether an AI-assisted API can analyse a clinical procurement prompt, filter product data, and support decision-making without turning the product into a clinical diagnosis or prescribing tool.

## Current Implementation Status
- Frontend: implemented.
- Static product and evidence data: implemented.
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

## Planned MVP Backend Stack
- Node.js + TypeScript
- Minimal API service for need analysis, product filtering, and comparison recommendations
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
