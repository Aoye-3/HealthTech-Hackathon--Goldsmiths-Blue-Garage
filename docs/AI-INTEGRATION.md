# AI Integration Plan

## Status
Planned / not implemented.

The frontend currently simulates AI behavior with local deterministic logic. The next MVP backend should add an AI provider abstraction so the product can validate prompt analysis, product filtering, and comparison rationale without binding the business logic to a single vendor.

## Goals
- Analyse procurement needs from plain-language clinician prompts.
- Extract product names, device categories, constraints, care setting, and decision criteria.
- Produce structured filters and clarification questions.
- Help rank product candidates using available product data.
- Generate comparison rationale for shortlisted products.

## Provider Abstraction
Planned interface:

```ts
interface AIProvider {
  analyseNeed(input: AnalyseNeedInput): Promise<AnalyseNeedResult>;
  refineNeed(input: RefineNeedInput): Promise<RefineNeedResult>;
  recommendProducts(input: RecommendProductsInput): Promise<RecommendProductsResult>;
}
```

The backend should call this interface rather than calling any provider directly from route handlers.

## Candidate Providers

### OpenAI Provider
OpenAI is the default candidate implementation for the MVP.

Implementation notes:
- Use `OPENAI_API_KEY` from environment variables.
- Verify the current official OpenAI documentation before implementation.
- Confirm the recommended Responses API usage, model choice, structured output strategy, and safety guidance before writing provider code.
- Keep prompts focused on procurement filtering and decision support.

### Mock Provider
The mock provider should return deterministic demo responses when no API key is configured or when frontend integration needs to run offline.

Use cases:
- Hackathon demo reliability.
- Local frontend/backend integration without external API calls.
- Regression checks for API response shape.

## Data Flow
1. Frontend sends a clinical procurement prompt to `POST /api/need/analyse`.
2. Backend loads product data.
3. Backend calls `AIProvider.analyseNeed()` with prompt and product catalogue context.
4. Provider returns structured filters, candidate products, clarification text, and confidence values.
5. Frontend displays extracted filters and asks the user to mark items as correct or wrong.
6. Frontend sends feedback to `POST /api/need/refine`.
7. Backend updates filters and determines whether the scope is ready for comparison.
8. Frontend requests shortlisted products or comparison recommendation.

## Assistant Context Ownership
The right-side AI Procurement Assistant must stay a single shell-level surface. The frontend renders it once through `AIAssistantPanel`, and all route-specific copy, actions, product CTAs, clean mode, and future persistence keys come from `buildAssistantContext(route)` in `src/data/assistantContext.ts`.

Do not add page-local chatbot state or route-specific assistant components when extending a page. Add new assistant context fields to the shared `AssistantContext` shape first, then render them through the existing panel.

Future persisted chat should use `AssistantContext.conversationScope` as the thread key. `route`, `productId`, and `reviewId` can be sent as metadata for grounding, but they should not create separate message stores unless the product intentionally needs a new conversation scope.

## Prompt Boundary
AI prompts should ask for:
- procurement need summary
- product names if explicitly present
- medical device or product categories if no exact product is present
- patient population and care setting
- decision criteria such as cost, usability, integration, evidence, support, and adoption
- clarification questions
- candidate product fit rationale

AI prompts must not ask for or produce:
- diagnosis
- treatment plans
- prescribing advice
- patient-specific medical recommendations
- unsupported claims about NHS approval or clinical effectiveness

## Structured Output
Provider responses should be structured. Free-form model text should not be passed directly to the UI as the only source of truth.

Minimum output fields:
- filters
- candidate products
- confidence or fit score
- rationale
- clarification message
- ready-for-comparison boolean
- safety notice

## Safety Notice
AI-assisted responses should include a notice similar to:

> AI output supports procurement filtering and decision-making only. It does not provide diagnosis, treatment, prescribing advice, or clinical instruction. Review is required by a clinician or procurement lead.

## Future Evaluation
The first backend MVP should be evaluated with a small set of prompts:
- prompt with a specific product name
- prompt with only a broad medical device need
- prompt with budget sensitivity
- prompt with integration requirements
- prompt with ambiguous wording requiring clarification

Evaluation should compare:
- extracted filters
- candidate products
- rationale quality
- whether the system asks useful clarification questions
- whether the product shortlist is explainable from the available data
