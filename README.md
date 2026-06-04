# ProcureSmart

Evidence-led procurement support for NHS primary care.

ProcureSmart is a hackathon prototype that helps clinicians and procurement leads turn a plain-language clinical need into a reviewed product shortlist, product comparison, peer evidence, approval pack, and post-purchase outcome record.

The current repository is a frontend-first React prototype. It uses static demonstration data to show the intended procurement workflow. A minimum Node.js + TypeScript backend and AI provider integration are planned, but not implemented yet.

## Why This Exists

Medical procurement in primary care can be slow and fragmented. Teams often need to:

- find the right NHS framework, lot, product category, and supplier;
- collect and compare multiple quotes;
- justify decisions through internal approval rounds;
- reduce preference-led or opaque procurement decisions;
- understand how similar NHS organisations used the product in practice;
- capture post-purchase outcomes so future teams can learn from the decision.

ProcureSmart is designed as a procurement decision layer on top of product catalogue and framework data. It does not replace NHS Supply Chain systems or formal purchasing workflows.

## Demo Scope

The prototype demonstrates:

- clinical need definition through a natural-language prompt;
- AI-style keyword and filter extraction;
- clinician feedback on extracted filters using Correct/Wrong actions;
- transition from clarification into product shortlist review;
- reviewed product shortlist, product detail, and second-round comparison views;
- product-specific peer evidence, horizontal clinician review browsing, review detail pages, and case-study style support;
- approval pack preparation;
- post-purchase outcome feedback.

Important data boundary:

**Demonstration data only. Not live NHS Supply Chain catalogue or pricing data.**

The current product, quote, peer review, and outcome records are simulated for hackathon demonstration purposes.

## Current Status

- Frontend: implemented.
- Static product and evidence data: implemented.
- Local demo workflow: implemented.
- Backend API: planned, not implemented.
- AI provider integration: planned, not implemented.
- Live NHS Supply Chain catalogue integration: planned future direction, not implemented.

## Tech Stack

- React 19
- Vite 7
- TypeScript 5.8
- `lucide-react` icons
- Local browser-history routing
- Static TypeScript data in `src/data/procurementData.ts`
- Playwright available for UI smoke checks

Planned backend stack:

- Node.js + TypeScript
- Minimal HTTP API service
- Candidate framework: Fastify or Express
- AI provider abstraction with OpenAI as the default candidate provider
- Mock provider fallback for local demos

## Quick Start

Install dependencies:

```bash
npm install
```

Start the local demo on Windows:

```bat
start-dev.bat
```

The script starts Vite at:

```text
http://127.0.0.1:3000
```

Primary demo route:

```text
http://127.0.0.1:3000/need-definition
```

Manual start:

```bash
npm.cmd run dev:local
```

Build:

```bash
npm.cmd run build
```

## Demo Flow

1. Open `/need-definition`.
2. Review or submit the clinical need prompt.
3. Click the send button to enter AI clarification mode.
4. Review AI-extracted filters on the left.
5. Mark filters as Correct or Wrong.
6. Continue to the product shortlist once the scope is narrow enough.
7. Open a product detail card, add products to comparison, then continue to second-round comparison.
8. Review peer evidence from product details or comparison.
9. Open a clinician review detail page from a verified review card before creating the approval pack.

## Key Routes

- `/need-definition`
- `/shortlist`
- `/shortlist/:productId`
- `/compare`
- `/peer-evidence/:productId`
- `/peer-evidence/:productId/reviews/:reviewId`
- `/approval-pack`
- `/outcomes`

## Repository Structure

```text
src/
  App.tsx                         route mapping and top-level state
  components/layout/              shell, sidebar, topbar, progress, AI panel
  components/procurement/         product, comparison, evidence, approval UI
  data/procurementData.ts         static prototype product/evidence data
  pages/                          route-level screens
  styles.css                      design tokens, layout, responsive behavior
docs/
  TECHNICAL.md                    technical overview and documentation index
  FRONTEND.md                     current frontend architecture
  BACKEND.md                      planned MVP backend
  API.md                          future API contract draft
  AI-INTEGRATION.md               AI provider abstraction and safety boundary
  RUNBOOK.md                      local setup and verification
  DOCUMENTATION.md                documentation maintenance rules
```

## Planned MVP Backend

The next product validation milestone is a minimal backend that can test whether AI-assisted filtering works against product data.

Planned API capabilities:

- `POST /api/need/analyse`: analyse the clinician prompt and return filters plus candidate products.
- `POST /api/need/refine`: update filters using chat history and Correct/Wrong feedback.
- `GET /api/products`: return product data.
- `POST /api/products/filter`: return shortlisted products from confirmed filters.
- `POST /api/compare/recommend`: return comparison recommendation rationale.

The backend should keep AI output structured and renderable by the frontend without parsing free-form prose.

## AI Safety Boundary

ProcureSmart is a procurement filtering and decision-support tool.

It must not provide diagnosis, prescribing guidance, treatment advice, or patient-specific clinical recommendations. AI-generated outputs should be treated as procurement rationale and require clinician or procurement lead review.

## Data Strategy

Hackathon phase:

- use public NHS framework information as contextual background;
- use clearly labelled simulated product catalogue data;
- demonstrate search, comparison, peer evidence, approval, and outcome workflows.

Future phase:

- connect to authorised catalogue feed, API, punch-out, or approved sample export where available;
- index product data into a product comparison layer;
- return users to formal NHS Supply Chain or P2P systems for purchasing.

## Source Material

- `PRD.md`: product workflow and acceptance criteria.
- `DESIGN.md`: NHS-inspired visual direction and layout rules.
- `docs/*`: frontend architecture, backend plan, API draft, AI integration, and runbook.
- FigJam references:
  - [User needs and procurement dashboard node](https://www.figma.com/board/V2MU9uooRvxIvVe9Dc76Sx/%E9%BB%91%E5%AE%A2%E6%9D%BE?node-id=36-1879&t=zYonJAzmMLMSZVz3-4)
  - [Data acquisition and architecture node](https://www.figma.com/board/V2MU9uooRvxIvVe9Dc76Sx/%E9%BB%91%E5%AE%A2%E6%9D%BE?node-id=80-315&t=zYonJAzmMLMSZVz3-4)

## Verification

For the current frontend prototype:

```bash
npm.cmd run build
```

Recommended smoke check:

- `/need-definition` loads.
- need definition enters AI clarification state.
- Correct/Wrong filter actions update the UI.
- product shortlist can be reached from the clarification workflow.
- product detail can be opened from the shortlist.
- product comparison and peer evidence can be reached from ProductList detail or comparison actions.
- clinician review details can be opened from product-specific peer evidence.
- sidebar navigation reaches top-level workspace routes.
- page-level scrolling stays contained inside work areas rather than the full browser document.

