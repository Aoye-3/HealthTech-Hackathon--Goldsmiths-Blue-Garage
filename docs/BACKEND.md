# MVP Backend Plan

## Status
Planned / not implemented.

No backend API server exists in the current repository. This document defines the minimum backend required for the next product validation milestone.

## Goal
Build the smallest backend that can validate whether AI-assisted product filtering works with procurement data. The backend should accept a clinician procurement prompt, extract useful filters, match candidate products, and return decision-support rationale for shortlist and comparison workflows.

## Recommended Stack
- Node.js + TypeScript.
- Minimal HTTP API service.
- Candidate framework: Fastify or Express.
- Product data source for MVP: static JSON derived from the current frontend `Product` shape.
- Future data source: database or NHS-reviewed product/evidence data integration.

The final framework choice should be made immediately before backend implementation. Both Fastify and Express fit the MVP; Fastify is a good default for typed request/response schemas, while Express is familiar and simple.

## MVP Responsibilities
- Receive clinician procurement prompts.
- Extract product names, device categories, patient population, care setting, constraints, and decision criteria.
- Use an AI provider to generate filters, clarification questions, and recommendation rationale.
- Filter product data using both AI-extracted filters and deterministic product fields.
- Accept user feedback such as `Correct` and `Wrong` on extracted filters.
- Decide whether the need is specific enough to proceed to product comparison.
- Return structured responses that the frontend can render without parsing free-form text.

## Out of Scope for MVP
- Authentication.
- Database persistence.
- Real NHS procurement catalogue integration.
- Clinical diagnosis, prescribing, treatment advice, or patient-specific medical recommendations.
- PDF generation or document storage.
- Production observability.

## Suggested Modules
- `server/index.ts`: API server bootstrap.
- `server/routes/need.ts`: need analysis and refinement endpoints.
- `server/routes/products.ts`: product listing and filtering endpoints.
- `server/routes/compare.ts`: comparison recommendation endpoint.
- `server/data/products.json`: MVP product data copied from current frontend fields.
- `server/ai/provider.ts`: AI provider interface.
- `server/ai/openai-provider.ts`: OpenAI provider implementation.
- `server/ai/mock-provider.ts`: deterministic fallback provider.

These files are planned only. They should not be created until the backend implementation phase begins.

## Product Data Model
The MVP backend should start from the current frontend product fields:
- `id`
- `name`
- `category`
- `supplier`
- `brand`
- `unitPrice`
- `benchmarkLow`
- `benchmarkHigh`
- `rating`
- `clinicianScore`
- `fitScore`
- `organisationsUsing`
- `verifiedReviews`
- `annualCost`
- `warranty`
- `integration`
- `implementationSupport`
- `aiRationale`

Future backend data can add:
- evidence source identifiers
- procurement framework identifiers
- implementation risk tags
- region or organisation adoption metadata
- clinical governance review metadata

## Safety Boundary
The backend must treat AI as procurement decision support. It must not return diagnosis, prescribing guidance, treatment advice, or patient-specific clinical recommendations. AI output should include language indicating that clinician or procurement lead review is required.
