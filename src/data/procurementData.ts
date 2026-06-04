import type { OutcomeMetric, Product, ProductEvidenceProfile, Review } from "../types";

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
    id: "sarah-jenkins",
    clinician: "Dr. Sarah Jenkins",
    role: "GP Partner",
    organisation: "Central London PCN",
    rating: 4.8,
    quote: "Significantly reduced our diagnostic load for cardiac assessments.",
    verified: true
  },
  {
    id: "david-thorne",
    clinician: "Mr. David Thorne",
    role: "Procurement Lead",
    organisation: "Northfield PCN",
    rating: 4.6,
    quote: "Pricing showed this was 12% below our regional average after rollout.",
    verified: true
  },
  {
    id: "helen-wong",
    clinician: "Dr. Helen Wong",
    role: "Clinical Safety Officer",
    organisation: "Midshire Primary Care",
    rating: 4.7,
    quote: "Training and onboarding were practical enough for four practices in one month.",
    verified: true
  },
  {
    id: "nisha-grant",
    clinician: "Ms. Nisha Grant",
    role: "Procurement Lead",
    organisation: "Islington PCN",
    rating: 4.5,
    quote: "The product matched our catalogue requirements and reduced the number of supplier clarifications.",
    verified: true
  },
  {
    id: "amina-patel",
    clinician: "Dr. Amina Patel",
    role: "Respiratory Lead",
    organisation: "Barnet Primary Care",
    rating: 4.8,
    quote: "We saw more consistent stock handling once the item was standardised across practices.",
    verified: true
  },
  {
    id: "oliver-reed",
    clinician: "Mr. Oliver Reed",
    role: "Primary Care Buyer",
    organisation: "Camden Health Partnership",
    rating: 4.4,
    quote: "Lead times were stable enough for routine replenishment, with clear non-returnable item handling.",
    verified: true
  },
  {
    id: "priya-mensah",
    clinician: "Dr. Priya Mensah",
    role: "GP Partner",
    organisation: "Westway Primary Care",
    rating: 4.7,
    quote: "The dressing was easy to justify because peer usage and cost benchmarks were visible together.",
    verified: true
  },
  {
    id: "claire-donovan",
    clinician: "Ms. Claire Donovan",
    role: "Practice Manager",
    organisation: "Enfield PCN",
    rating: 4.6,
    quote: "Procurement admin was simpler because the product identifiers were complete and reusable.",
    verified: true
  },
  {
    id: "marcus-ellis",
    clinician: "Dr. Marcus Ellis",
    role: "Clinical Governance Lead",
    organisation: "North Central London",
    rating: 4.5,
    quote: "The evidence pack gave our approval group enough peer context to make a faster decision.",
    verified: true
  },
  {
    id: "rhea-langford",
    clinician: "Ms. Rhea Langford",
    role: "Community Services Lead",
    organisation: "Tower Hamlets GP Care Group",
    rating: 4.6,
    quote: "Peer comments helped us compare implementation effort before moving the item into final approval.",
    verified: true
  }
];

export const productEvidenceProfiles: Record<string, ProductEvidenceProfile> = {
  fag1243: {
    productId: "fag1243",
    organisationName: "North London PCN",
    evidenceTitle: "Peer evidence",
    evidenceSummary: "Verified clinician reviews, respiratory stock adoption and implementation evidence.",
    mapTitle: "London Adoption Map",
    mapSubtitle: "Live deployment tracking across London ICS",
    activeLeads: "06",
    credibilityScore: 4.3,
    credibilityReviewCount: 118,
    verifiedUsers: 87,
    pins: [
      { label: "04", tone: "blue", x: 30, y: 36 },
      { label: "02", tone: "teal", x: 66, y: 52 },
      { label: "06", tone: "green", x: 48, y: 72 }
    ],
    reviews: [
      {
        id: "amina-patel",
        clinician: "Dr. Amina Patel",
        role: "Respiratory Lead",
        organisation: "Barnet Primary Care",
        rating: 4.4,
        quote: "Lead time was predictable enough for planned respiratory stock replenishment.",
        verified: true
      },
      {
        id: "claire-donovan",
        clinician: "Ms. Claire Donovan",
        role: "Practice Manager",
        organisation: "Enfield PCN",
        rating: 4.2,
        quote: "The catalogue identifiers made repeat ordering straightforward for our admin team.",
        verified: true
      },
      {
        id: "reuben-shah",
        clinician: "Dr. Reuben Shah",
        role: "GP Partner",
        organisation: "Haringey Collaborative",
        rating: 4.3,
        quote: "A reliable baseline item, with fewer substitutions than our previous order route.",
        verified: true
      }
    ]
  },
  fag4212: {
    productId: "fag4212",
    organisationName: "North London PCN",
    evidenceTitle: "Peer evidence",
    evidenceSummary: "Verified clinician reviews, regional adoption and implementation evidence.",
    mapTitle: "London Adoption Map",
    mapSubtitle: "Live deployment tracking across London ICS",
    activeLeads: "08",
    credibilityScore: 4.8,
    credibilityReviewCount: 142,
    verifiedUsers: 156,
    pins: [
      { label: "05", tone: "blue", x: 31, y: 36 },
      { label: "03", tone: "teal", x: 72, y: 58 },
      { label: "08", tone: "green", x: 46, y: 72 }
    ],
    reviews: peerReviews
  },
  fag4279: {
    productId: "fag4279",
    organisationName: "North London PCN",
    evidenceTitle: "Peer evidence",
    evidenceSummary: "Verified peer benchmark data and support evidence for selected comparator review.",
    mapTitle: "London Adoption Map",
    mapSubtitle: "Comparator deployment tracking across London ICS",
    activeLeads: "04",
    credibilityScore: 3.9,
    credibilityReviewCount: 76,
    verifiedUsers: 42,
    pins: [
      { label: "01", tone: "blue", x: 38, y: 42 },
      { label: "03", tone: "teal", x: 63, y: 48 },
      { label: "04", tone: "green", x: 52, y: 70 }
    ],
    reviews: [
      {
        id: "helen-wong",
        clinician: "Dr. Helen Wong",
        role: "Clinical Safety Officer",
        organisation: "Midshire Primary Care",
        rating: 3.8,
        quote: "The item was suitable, but quote variation was higher than we expected.",
        verified: true
      },
      {
        id: "david-thorne",
        clinician: "Mr. David Thorne",
        role: "Procurement Lead",
        organisation: "Northfield PCN",
        rating: 3.7,
        quote: "We needed extra supplier clarification before moving it into final comparison.",
        verified: true
      },
      {
        id: "priya-mensah",
        clinician: "Dr. Priya Mensah",
        role: "GP Partner",
        organisation: "Westway Primary Care",
        rating: 4.0,
        quote: "Operationally workable, though support was lighter than the top-ranked option.",
        verified: true
      }
    ]
  },
  fag4128: {
    productId: "fag4128",
    organisationName: "North London PCN",
    evidenceTitle: "Peer evidence",
    evidenceSummary: "Verified adoption signals and pathway-fit evidence for neonatal respiratory consumables.",
    mapTitle: "London Adoption Map",
    mapSubtitle: "Specialist pathway deployment tracking across London ICS",
    activeLeads: "05",
    credibilityScore: 4.1,
    credibilityReviewCount: 93,
    verifiedUsers: 54,
    pins: [
      { label: "02", tone: "blue", x: 34, y: 34 },
      { label: "03", tone: "teal", x: 70, y: 50 },
      { label: "05", tone: "green", x: 44, y: 68 }
    ],
    reviews: [
      {
        id: "leanne-morris",
        clinician: "Dr. Leanne Morris",
        role: "Respiratory GPwSI",
        organisation: "Camden Primary Care",
        rating: 4.1,
        quote: "Useful for specialist pathway stock, but the use case needs confirming up front.",
        verified: true
      },
      {
        id: "nisha-grant",
        clinician: "Ms. Nisha Grant",
        role: "Procurement Lead",
        organisation: "Islington PCN",
        rating: 4.0,
        quote: "Catalogue clarity was good, with additional governance review for neonatal relevance.",
        verified: true
      },
      {
        id: "marcus-ellis",
        clinician: "Dr. Marcus Ellis",
        role: "Clinical Governance Lead",
        organisation: "North Central London",
        rating: 4.2,
        quote: "Best handled as a pathway-specific option rather than a routine practice consumable.",
        verified: true
      }
    ]
  }
};

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
