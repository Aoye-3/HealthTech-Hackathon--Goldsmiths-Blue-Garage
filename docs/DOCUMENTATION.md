# Documentation Maintenance

## Purpose
This folder keeps product, frontend, backend, API, and AI integration decisions aligned as the prototype moves from static frontend to MVP backend integration.

## Document Roles
- `../PRD.md`: product goals, user workflow, functional requirements, and acceptance criteria.
- `../DESIGN.md`: visual system, layout rules, components, and interaction principles.
- `TECHNICAL.md`: technical overview and documentation index.
- `FRONTEND.md`: current frontend architecture and future API migration points.
- `BACKEND.md`: planned MVP backend architecture.
- `API.md`: future frontend/backend API contract draft.
- `AI-INTEGRATION.md`: AI provider abstraction, OpenAI candidate provider, mock fallback, and safety boundaries.
- `RUNBOOK.md`: setup, local start, build, demo, and smoke verification.

## Update Rules
- Update `PRD.md` when the product workflow or acceptance criteria change.
- Update `DESIGN.md` when visual tokens, layout rules, or component behavior change.
- Update `FRONTEND.md` when route structure, app shell behavior, data flow, or component ownership changes.
- Update `BACKEND.md` when the backend stack, module boundaries, or implementation status changes.
- Update `API.md` when endpoint names, request bodies, response bodies, or integration assumptions change.
- Update `AI-INTEGRATION.md` when provider behavior, prompt strategy, model choice, or safety boundaries change.
- Update `RUNBOOK.md` when commands, ports, setup steps, or demo flow change.

## Status Language
Use explicit status labels:
- `Implemented`: code exists in the repository and can be verified.
- `Planned / not implemented`: documented future work, no code exists yet.
- `Prototype only`: works for local demo but is not production-ready.

Avoid wording that implies planned backend or AI features already exist.

## Backend Documentation Rule
Until the backend is implemented, backend docs must describe:
- intended capability
- planned API contract
- safety boundary
- likely implementation path

They must not claim:
- production readiness
- live NHS data integration
- real AI analysis
- persistent storage
- clinical decision automation

## AI Documentation Rule
AI docs must keep procurement decision support separate from clinical advice. Any AI feature should state that clinician or procurement lead review is required.

## Verification Before Handoff
Before handing off documentation changes:
- Run `npm.cmd run build` if code or package scripts changed.
- Check that `TECHNICAL.md` links to every docs file.
- Check that backend and API docs are marked as planned if no backend code exists.
- Check that run commands in `RUNBOOK.md` match `package.json`.
- Check that no temporary screenshots, logs, or reports were added to the repository.
