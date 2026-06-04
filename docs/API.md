# API Contract Draft

## Status
Future contract / not implemented.

The current frontend does not call these endpoints. This draft defines the minimum API surface for the planned Node.js + TypeScript backend MVP.

## Common Principles
- All responses should be JSON.
- Responses should be structured enough for the frontend to render without parsing prose.
- AI-generated fields should include a `rationale` or `source` where useful.
- Clinical safety copy should be included where the response contains AI-generated decision-support output.
- Chatbot persistence should use a stable `conversationScope` from the frontend assistant context rather than page-local state.

## POST /api/need/analyse
Analyse the initial clinician procurement prompt.

### Request
```json
{
  "prompt": "We need a home blood pressure monitoring solution for elderly patients with hypertension across 4 practices."
}
```

### Response
```json
{
  "needId": "demo-need-001",
  "filters": [
    {
      "id": "remote-bp-monitoring",
      "kind": "device_category",
      "label": "Remote BP monitoring",
      "status": "suggested",
      "confidence": 0.9,
      "rationale": "The prompt asks for home blood pressure monitoring."
    }
  ],
  "candidateProducts": [
    {
      "productId": "surebp-connect",
      "fitScore": 92,
      "rationale": "Strong fit for multi-practice connected BP monitoring."
    }
  ],
  "clarificationMessage": "Please confirm whether remote BP monitoring and elderly usability are required criteria.",
  "readyForComparison": false,
  "safetyNotice": "AI output supports procurement filtering only and requires clinician review."
}
```

## POST /api/need/refine
Refine filters using chat history and user feedback.

### Request
```json
{
  "needId": "demo-need-001",
  "prompt": "We need a home blood pressure monitoring solution for elderly patients with hypertension across 4 practices.",
  "messages": [
    {
      "role": "assistant",
      "content": "Please confirm whether remote BP monitoring is the intended category."
    }
  ],
  "feedback": [
    {
      "filterId": "remote-bp-monitoring",
      "status": "accepted"
    },
    {
      "filterId": "clinical-bp-monitor",
      "status": "rejected"
    }
  ]
}
```

### Response
```json
{
  "needId": "demo-need-001",
  "filters": [
    {
      "id": "remote-bp-monitoring",
      "kind": "device_category",
      "label": "Remote BP monitoring",
      "status": "accepted",
      "confidence": 0.95,
      "rationale": "Confirmed by the user."
    }
  ],
  "clarificationMessage": "The scope is narrow enough to compare connected BP monitoring products.",
  "readyForComparison": true,
  "safetyNotice": "AI output supports procurement filtering only and requires clinician review."
}
```

## GET /api/products
Return available products.

### Response
```json
{
  "products": [
    {
      "id": "surebp-connect",
      "name": "SureBP Connect",
      "category": "Connected BP monitoring kit",
      "supplier": "SureBP Ltd",
      "fitScore": 92
    }
  ]
}
```

## GET /api/products/:productId/evidence
Return product-specific peer evidence, adoption map data, and review summaries.

### Response
```json
{
  "productId": "fag4212",
  "organisationName": "North London PCN",
  "evidenceTitle": "Peer evidence",
  "evidenceSummary": "Verified clinician reviews, regional adoption and implementation evidence.",
  "mapTitle": "London Adoption Map",
  "mapSubtitle": "Live deployment tracking across London ICS",
  "activeLeads": "08",
  "credibilityScore": 4.8,
  "credibilityReviewCount": 142,
  "verifiedUsers": 156,
  "pins": [
    { "label": "05", "tone": "blue", "x": 31, "y": 36 }
  ],
  "reviews": [
    {
      "id": "sarah-jenkins",
      "clinician": "Dr. Sarah Jenkins",
      "role": "GP Partner",
      "organisation": "Central London PCN",
      "rating": 4.8,
      "quote": "Significantly reduced our diagnostic load for cardiac assessments.",
      "verified": true
    }
  ]
}
```

## GET /api/products/:productId/evidence/reviews/:reviewId
Return a product-specific clinician review detail record.

The current frontend can render this page using a review summary plus fallback detail fields, but the backend should eventually return expanded detail data for each review.

### Response
```json
{
  "productId": "fag4212",
  "review": {
    "id": "sarah-jenkins",
    "clinician": "Dr. Sarah Jenkins",
    "role": "GP Partner",
    "organisation": "Central London PCN",
    "rating": 4.8,
    "quote": "Significantly reduced our diagnostic load for cardiac assessments.",
    "verified": true,
    "detail": {
      "confidence": "High",
      "evidenceStrength": "Strong",
      "usagePeriod": "6 months",
      "clinicalSetting": "Primary care",
      "productUse": "Tracheostomy care dressing",
      "relevantPathway": "Community-based respiratory and post-discharge care",
      "breakdown": [
        { "label": "Clinical usefulness", "value": "4.9 / 5", "score": 4.9 }
      ],
      "relevanceScore": 87,
      "relevanceReasons": [
        "Same product category",
        "Similar primary care procurement context"
      ],
      "impactMetrics": [
        { "label": "Diagnostic workload", "value": "Reduced", "tone": "green" }
      ],
      "limitations": [
        "Based on one organisation's experience"
      ],
      "approvalEvidence": "Verified peer feedback indicates strong usability in a similar primary care setting."
    }
  },
  "safetyNotice": "Peer evidence supports procurement decision-making only and requires human review."
}
```

## POST /api/products/filter
Return shortlisted products using confirmed filters.

### Request
```json
{
  "needId": "demo-need-001",
  "filters": [
    {
      "id": "remote-bp-monitoring",
      "status": "accepted"
    }
  ]
}
```

### Response
```json
{
  "products": [
    {
      "id": "surebp-connect",
      "fitScore": 92,
      "rationale": "Best balance of cost, verified outcomes, implementation support and multi-site rollout."
    }
  ]
}
```

## POST /api/compare/recommend
Return AI-assisted comparison rationale for selected products.

### Request
```json
{
  "needId": "demo-need-001",
  "selectedProductIds": ["meditrack-bp", "surebp-connect", "prohealth-bp-200"],
  "needContext": {
    "patientPopulation": "elderly patients with hypertension",
    "setting": "4 GP practices",
    "criteria": ["remote monitoring", "elderly usability", "budget sensitivity"]
  }
}
```

### Response
```json
{
  "recommendedProductId": "surebp-connect",
  "rationale": "SureBP Connect has the strongest balance of cost, verified adoption, integration coverage, and implementation support.",
  "risks": [
    "Confirm training requirements across all four practices before approval."
  ],
  "safetyNotice": "AI output supports procurement decision-making only and requires human review."
}
```

## POST /api/assistant/messages
Persist and continue the right-panel assistant conversation for the current procurement workflow context.

The frontend currently renders deterministic assistant context from `src/data/assistantContext.ts`. A future backend should keep one message thread per `conversationScope`, so route transitions and subpages can preserve context without each page owning a separate chatbot implementation.

### Request
```json
{
  "conversationScope": "procurement-workflow:peer-evidence",
  "route": "peer-evidence",
  "productId": "fag4212",
  "reviewId": null,
  "message": "Summarise the strongest peer evidence for this product.",
  "history": [
    {
      "role": "assistant",
      "content": "This evidence view is linked to the selected product detail card."
    }
  ]
}
```

### Response
```json
{
  "conversationScope": "procurement-workflow:peer-evidence",
  "messages": [
    {
      "role": "assistant",
      "content": "Verified clinician reviews show strong usability and adoption in similar primary care settings."
    }
  ],
  "assistantContext": {
    "mode": "standard",
    "primaryMessage": "This evidence view is linked to the selected product detail card.",
    "secondaryMessages": [
      "You can request a direct peer conversation before final approval."
    ],
    "actions": [
      { "label": "Generate summary", "kind": "button" }
    ]
  },
  "safetyNotice": "AI output supports procurement decision-making only and requires clinician or procurement lead review."
}
```

### Persistence Rules
- `conversationScope` is required and should be treated as the thread key.
- `route`, `productId`, and `reviewId` are context metadata, not substitute thread keys.
- The clinician review detail route may send `mode: "clean"` until review-specific assistant behavior is defined.
- Backend responses should preserve structured assistant actions instead of returning prose-only instructions for the UI to parse.
