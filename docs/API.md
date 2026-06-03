# API Contract Draft

## Status
Future contract / not implemented.

The current frontend does not call these endpoints. This draft defines the minimum API surface for the planned Node.js + TypeScript backend MVP.

## Common Principles
- All responses should be JSON.
- Responses should be structured enough for the frontend to render without parsing prose.
- AI-generated fields should include a `rationale` or `source` where useful.
- Clinical safety copy should be included where the response contains AI-generated decision-support output.

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
