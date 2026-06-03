# NHS ProcureSmart PRD

## Product Goal
Help NHS and GP practice clinicians make medical procurement decisions faster and with stronger evidence by turning a plain-language clinical need into an NHS-reviewed shortlist, comparison evidence, peer proof, approval documentation, and post-purchase outcome reporting.

## User
- Primary user: NHS GP practice lead, clinician, procurement lead, or PCN manager.
- Key pain: buying medical equipment is slow, fragmented and evidence-heavy. Users must find suppliers, compare quotes, gather peer evidence, justify decisions, and support internal approval.

## Core Workflow
1. Need Definition: user describes the clinical need instead of searching by product name.
2. Product Shortlist: AI converts the need into a small set of NHS-reviewed candidates.
3. Product Comparison: user compares unit price, supplier, warranty, integration, adoption, clinician score, support and annual cost.
4. Peer Evidence: user checks verified reviews, regional adoption and implementation evidence.
5. Approval Pack: system compiles evidence into a review-ready business case.
6. Outcomes: user records deployment feedback and generates post-purchase learning for future NHS decisions.

## Functional Requirements
- The app must provide route-level screens for `/need-definition`, `/shortlist`, `/compare`, `/peer-evidence/:productId`, `/approval-pack`, and `/outcomes`.
- The fixed left navigation must remain visually and structurally consistent across all pages.
- The AI assistant panel must provide page-specific summaries while keeping the same interaction pattern.
- The decision progress component must show the end-to-end procurement path and current stage.
- Product shortlist cards must support add/remove selection state.
- Evidence actions must navigate to product peer evidence.
- Comparison must highlight the recommended product and show a price transparency warning when a quote exceeds benchmark.
- Approval pack must show document sections, central preview, readiness state, and export/share actions.
- Outcomes must allow rating and implementation note submission with visible confirmation.

## Page Details
- Need Definition:
  - Large H1: "What clinical need are you solving today?"
  - Large text input seeded with the BP monitoring scenario.
  - AI-extracted theme pills.
  - Recommended procurement pathway.
- Product Shortlist:
  - Professional product cards, not swipe-only consumer cards.
  - Cards include NHS reviewed badge, adoption numbers, rating, verified reviews, price, fit score and AI rationale.
  - Right decision panel tracks selected products for comparison.
- Product Comparison:
  - Three shortlisted product headers.
  - Table comparing commercial and evidence criteria.
  - Price transparency module.
  - AI recommendation module leading to approval pack.
- Peer Evidence:
  - Back button to product shortlist.
  - Product evidence header.
  - London adoption map visualization.
  - Evidence credibility and verified clinician reviews.
  - Request peer conversation CTA.
- Approval Pack:
  - Persistent section progress list.
  - Business case cover preview.
  - Readiness metrics: evidence completeness, quotations, verified peer reviews and internal review state.
  - Export PDF and share actions.
- Outcomes:
  - Deployment metrics.
  - Usage, issue and effectiveness trend panels.
  - Feedback form with rating, implementation note and case study action.
  - Confirmation after feedback submission.

## Acceptance Criteria
- Every route is reachable from the sidebar.
- The core journey can be clicked through without a page reload.
- Sidebar active state matches the current page.
- Shortlist selection and feedback submission update local UI state.
- Layout remains readable on desktop and mobile widths.
- `npm run build` passes.
- `DESIGN.md` and `docs/TECHNICAL.md` remain aligned with the implemented structure.
