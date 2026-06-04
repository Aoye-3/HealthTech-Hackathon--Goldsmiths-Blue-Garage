import type { OutcomeMetric, Product, Review } from "../types";

export const clinicalNeed =
  "We need routine airway care consumables for respiratory support and tracheostomy site care across 4 practices.";

export const extractedThemes = [
  "Airway care",
  "Respiratory support",
  "4 GP practices",
  "NHS reviewed only",
  "Routine stock management"
];

export const products: Product[] = [
  {
    id: "fag1243",
    catalogueCode: "FAG1243",
    name: "Breathing system AquaNASE nasal high flow system 5mm - non returnable",
    category: "Breathing system",
    supplier: "ARMSTRONG MEDICAL LTD",
    brand: "Armstrong Medical Ltd",
    mpc: "AMNS1005",
    gtin: "05060708931223",
    unitOfIssue: "Box of 30",
    size: "5mm",
    clinicalArea: "Airway care / Respiratory support",
    returnStatus: "Non-returnable item",
    productType: "Single-use respiratory consumable",
    procurementNote: "5 days lead time. Suitable for planned respiratory stock replenishment.",
    dataSource: "NHS catalogue / supplier listing",
    leadTime: "5 days lead time",
    unitPrice: 119,
    benchmarkLow: 110,
    benchmarkHigh: 132,
    rating: 4.1,
    clinicianScore: 4.1,
    fitScore: 88,
    organisationsUsing: 87,
    verifiedReviews: 128,
    annualCost: 14280,
    warranty: "3 years",
    integration: "EMIS, SystmOne",
    implementationSupport: "Standard",
    imageTone: "blue",
    aiRationale: "Strong baseline consumable with clear catalogue identifiers and predictable lead time."
  },
  {
    id: "fag4212",
    catalogueCode: "FAG4212",
    name: "Tracheostomy Tube Accessories Dressing Advazorb lite 80mm x 80mm - NON RETURNABLE ITEM",
    category: "Tracheostomy care dressing",
    supplier: "INSIGHT MEDICAL PRODUCTS LIMITED",
    brand: "Advancis Medical Advazorb",
    mpc: "CR/4212",
    gtin: "05060031476118",
    unitOfIssue: "Pack of 20",
    size: "80mm x 80mm",
    clinicalArea: "Airway care / Respiratory support",
    returnStatus: "Non-returnable item",
    productType: "Single-use consumable dressing",
    procurementNote: "Suitable for routine stock management and tracheostomy site care.",
    dataSource: "NHS catalogue / supplier listing",
    unitPrice: 112,
    benchmarkLow: 108,
    benchmarkHigh: 128,
    rating: 4.7,
    clinicianScore: 4.7,
    fitScore: 92,
    organisationsUsing: 156,
    verifiedReviews: 214,
    annualCost: 13440,
    warranty: "5 years",
    integration: "EMIS, SystmOne, Vision",
    implementationSupport: "Comprehensive",
    imageTone: "teal",
    aiRationale: "Evidence-aligned, widely used and suitable for routine airway care."
  },
  {
    id: "fag4279",
    catalogueCode: "FAG4279",
    name: "Breathing system Air-Guard Clear",
    category: "Breathing system",
    supplier: "INTERSURGICAL LTD",
    brand: "Intersurgical",
    mpc: "1790000",
    gtin: "05030267044832",
    unitOfIssue: "Box of 50",
    size: "Standard breathing circuit",
    clinicalArea: "Airway care / Respiratory support",
    returnStatus: "Supplier return policy applies",
    productType: "Single-use breathing system",
    procurementNote: "Suitable comparator, but current quote is above peer benchmark.",
    dataSource: "NHS catalogue / supplier listing",
    unitPrice: 142,
    benchmarkLow: 118,
    benchmarkHigh: 130,
    rating: 3.6,
    clinicianScore: 3.6,
    fitScore: 74,
    organisationsUsing: 42,
    verifiedReviews: 76,
    annualCost: 15620,
    warranty: "2 years",
    integration: "EMIS",
    implementationSupport: "Standard",
    imageTone: "violet",
    aiRationale: "Suitable device, but current quote is above peer benchmark and support is lighter."
  },
  {
    id: "fag4128",
    catalogueCode: "FAG4128",
    name: "CPAP system AQUAVENT NEO neonatal CPAP limb for Infant Flow - NON RETURNABLE",
    category: "CPAP system",
    supplier: "ARMSTRONG MEDICAL LTD",
    brand: "Armstrong Medical Ltd",
    mpc: "AMCP1409-090",
    gtin: "25059443001944",
    unitOfIssue: "Box of 20",
    size: "Neonatal limb",
    clinicalArea: "Airway care / Respiratory support",
    returnStatus: "Non-returnable item",
    productType: "Single-use respiratory consumable",
    procurementNote: "5 days lead time. Review neonatal pathway relevance before selection.",
    dataSource: "NHS catalogue / supplier listing",
    leadTime: "5 days lead time",
    unitPrice: 136,
    benchmarkLow: 121,
    benchmarkHigh: 139,
    rating: 4.0,
    clinicianScore: 4.0,
    fitScore: 81,
    organisationsUsing: 54,
    verifiedReviews: 93,
    annualCost: 14680,
    warranty: "Supplier policy",
    integration: "NHS catalogue",
    implementationSupport: "Standard",
    imageTone: "blue",
    aiRationale: "Relevant respiratory consumable, but neonatal use case should be confirmed."
  }
];

export const peerReviews: Review[] = [
  {
    clinician: "Dr. Sarah Jenkins",
    role: "GP Partner",
    organisation: "Central London PCN",
    rating: 4.8,
    quote: "Significantly reduced our diagnostic load for cardiac assessments.",
    verified: true
  },
  {
    clinician: "Mr. David Thorne",
    role: "Procurement Lead",
    organisation: "Northfield PCN",
    rating: 4.6,
    quote: "Pricing showed this was 12% below our regional average after rollout.",
    verified: true
  },
  {
    clinician: "Dr. Helen Wong",
    role: "Clinical Safety Officer",
    organisation: "Midshire Primary Care",
    rating: 4.7,
    quote: "Training and onboarding were practical enough for four practices in one month.",
    verified: true
  }
];

export const outcomeMetrics: OutcomeMetric[] = [
  { label: "Products deployed", value: "24", delta: "+3 vs last 3 months" },
  { label: "Active practices", value: "47 / 50", delta: "+5 vs last 3 months" },
  { label: "Clinician satisfaction", value: "4.5 / 5", delta: "+0.3 vs last 3 months" },
  { label: "Reported effectiveness", value: "88%", delta: "+6% vs last 3 months" }
];

export const approvalSections = [
  "Need statement",
  "Product shortlist",
  "Three quotation comparison",
  "Peer evidence",
  "Recommended option",
  "Risk assessment",
  "Decision record"
];
