# ProcureSmart Design System

## Design Evidence
- FigJam nodes used as primary evidence: `35:1985`, `36:2167`, `36:2191`, `36:2152`, `35:2046`, `36:2276`.
- User-provided reference images confirm the required layout pattern: deep NHS-blue left navigation, white clinical work area, right-side AI assistant, and persistent procurement decision progress for comparison and approval flows.
- Full FigJam XML extraction timed out, so screenshots and user-provided annotated images are the current design source of truth. The latest ProductList references establish the shortlist card stack and product-detail-driven second-round flow.

## Visual Direction
- Product character: NHS procurement workbench, not a marketing landing page.
- Mood: clinical, evidence-led, restrained, professional and data-dense.
- Layout: fixed left rail, central task surface, right AI assistant panel where appropriate.
- Avoid decorative gradients or unrelated illustrative elements. Small teal sparkle marks are allowed only where the reference uses them.

## Color Tokens
- NHS primary blue: `#005eb8`.
- NHS dark blue: `#003087`.
- Ink text: `#061b46`.
- Muted text: `#587093`.
- Border: `#dbe5f2`.
- Page background: `#eef4fa`.
- Surface: `#ffffff`.
- Evidence teal: `#009ca6`.
- Success green: `#0f9d78`.
- Warning amber: `#f5a400`.
- Alert red: `#d5281b`.

## Layout Rules
- The left sidebar remains visually consistent on all routes and exposes only top-level workspace entries.
- Sidebar uses NHS-style deep blue gradient, white NHS mark, icon + text navigation, and a trust footer.
- The top bar stays light: assurance text, search, notification, organisation, and user identity.
- The right AI assistant panel keeps a consistent header, insight cards, suggested prompts, and input area.
- Decision progress is preserved across the full journey and highlights the current stage.
- Product Comparison and Peer Evidence remain progress stages, but are entered from ProductList detail and comparison actions rather than left navigation.
- Cards use `8px` radius or less, light borders, and subtle shadows only on major app surfaces.

## Components
- Product cards must include product name, supplier/category, NHS reviewed badge, adoption count, verified reviews, rating, price, fit score, and actions.
- ProductList uses a stacked card interaction with left/right controls for first-round review.
- Product detail cards show expanded procurement facts and expose the peer evidence entry for the selected product.
- NHS catalogue cards are high-density: image tile, NHS reviewed badge, MPC, GTIN, unit of issue, brand, supplier, category, clinical area, size, return status, product type, procurement note and data source must stay visible on the primary card.
- Comparison pages use a fixed three-product matrix with a same-height right insight column, keeping price transparency and AI recommendation aligned to the comparison table.
- Comparison pages use table/matrix layout rather than a loose card grid.
- Peer evidence pages combine map-like adoption visualization, credibility metrics, and verified clinician reviews.
- Approval pack pages keep section progress on the left, document preview in the center, and status/actions on the right.
- Outcomes pages combine metric cards, trend panels, feedback form, and AI follow-up.

## Interaction Principles
- Buttons use icons from `lucide-react` where available.
- Main workflow actions are visible: continue to comparison, view evidence, create approval pack, export/share, submit feedback.
- Controls must update local UI state in the prototype rather than appearing inert.
- Text must not overflow or overlap on common desktop and mobile widths.
