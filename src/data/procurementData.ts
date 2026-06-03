import type { OutcomeMetric, Product, Review } from "../types";

export const clinicalNeed =
  "We need a home blood pressure monitoring solution for elderly patients with hypertension across 4 practices.";

export const extractedThemes = [
  "Remote monitoring",
  "Elderly patients",
  "4 GP practices",
  "NHS reviewed only",
  "Budget sensitivity"
];

export const products: Product[] = [
  {
    id: "meditrack-bp",
    name: "MediTrack BP Monitor",
    category: "Remote blood pressure monitoring",
    supplier: "MediTrack Ltd",
    brand: "MediTrack",
    unitPrice: 119,
    benchmarkLow: 118,
    benchmarkHigh: 130,
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
    aiRationale: "Strong baseline option with familiar integrations and reliable clinical feedback."
  },
  {
    id: "surebp-connect",
    name: "SureBP Connect",
    category: "Connected BP monitoring kit",
    supplier: "SureBP Ltd",
    brand: "SureBP",
    unitPrice: 112,
    benchmarkLow: 118,
    benchmarkHigh: 130,
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
    aiRationale: "Best balance of cost, verified outcomes, implementation support and multi-site rollout."
  },
  {
    id: "prohealth-bp-200",
    name: "ProHealth BP 200",
    category: "Clinical BP monitor",
    supplier: "ProHealth Devices Ltd",
    brand: "ProHealth",
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
