# ProcureSmart Design System

## Design Evidence
- FigJam nodes used as primary evidence: `35:1985`, `36:2167`, `36:2191`, `36:2152`, `35:2046`, `36:2276`.
- User-provided reference images confirm the required layout pattern: deep NHS-blue left navigation, white clinical work area, right-side AI assistant, and persistent procurement decision progress for comparison and approval flows.
- Full FigJam XML extraction timed out, so screenshots and user-provided annotated images are the current design source of truth.

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
- The left sidebar remains visually consistent on all routes.
- Sidebar uses NHS-style deep blue gradient, white NHS mark, icon + text navigation, and a trust footer.
- The top bar stays light: assurance text, search, notification, organisation, and user identity.
- The right AI assistant panel keeps a consistent header, insight cards, suggested prompts, and input area.
- Decision progress is preserved across the full journey and highlights the current stage.
- Cards use `8px` radius or less, light borders, and subtle shadows only on major app surfaces.

## Components
- Product cards must include product name, supplier/category, NHS reviewed badge, adoption count, verified reviews, rating, price, fit score, and actions.
- Comparison pages use table/matrix layout rather than a loose card grid.
- Peer evidence pages combine map-like adoption visualization, credibility metrics, and verified clinician reviews.
- Approval pack pages keep section progress on the left, document preview in the center, and status/actions on the right.
- Outcomes pages combine metric cards, trend panels, feedback form, and AI follow-up.

## Interaction Principles
- Buttons use icons from `lucide-react` where available.
- Main workflow actions are visible: continue to comparison, view evidence, create approval pack, export/share, submit feedback.
- Controls must update local UI state in the prototype rather than appearing inert.
- Text must not overflow or overlap on common desktop and mobile widths.
