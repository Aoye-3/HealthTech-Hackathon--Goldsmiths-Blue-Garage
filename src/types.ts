import type { LucideIcon } from "lucide-react";

export type RouteKey =
  | "need-definition"
  | "shortlist"
  | "compare"
  | "peer-evidence"
  | "clinician-review"
  | "approval-pack"
  | "outcomes";

export type ShortlistViewMode = "stack" | "detail";

export interface NavItem {
  key: RouteKey;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface Product {
  id: string;
  catalogueCode: string;
  name: string;
  category: string;
  supplier: string;
  brand: string;
  mpc: string;
  gtin: string;
  unitOfIssue: string;
  size: string;
  clinicalArea: string;
  returnStatus: string;
  productType: string;
  procurementNote: string;
  dataSource: string;
  leadTime?: string;
  unitPrice: number;
  benchmarkLow: number;
  benchmarkHigh: number;
  rating: number;
  clinicianScore: number;
  fitScore: number;
  organisationsUsing: number;
  verifiedReviews: number;
  annualCost: number;
  warranty: string;
  integration: string;
  implementationSupport: string;
  imageTone: "blue" | "teal" | "violet";
  aiRationale: string;
}

export interface Review {
  id: string;
  clinician: string;
  role: string;
  organisation: string;
  rating: number;
  quote: string;
  verified: boolean;
  detail?: ReviewDetail;
}

export interface ReviewBreakdownItem {
  label: string;
  value: string;
  score?: number;
}

export interface ReviewImpactMetric {
  label: string;
  value: string;
  tone?: "green" | "blue" | "amber";
}

export interface ReviewDetail {
  confidence: "High" | "Medium" | "Low";
  evidenceStrength: "Strong" | "Moderate" | "Limited";
  usagePeriod: string;
  clinicalSetting: string;
  productUse: string;
  relevantPathway: string;
  breakdown: ReviewBreakdownItem[];
  relevanceScore: number;
  relevanceReasons: string[];
  impactMetrics: ReviewImpactMetric[];
  limitations: string[];
  approvalEvidence: string;
}

export interface EvidenceMapPin {
  label: string;
  tone: "blue" | "teal" | "green";
  x: number;
  y: number;
}

export interface ProductEvidenceProfile {
  productId: string;
  organisationName: string;
  evidenceTitle: string;
  evidenceSummary: string;
  mapTitle: string;
  mapSubtitle: string;
  activeLeads: string;
  credibilityScore: number;
  credibilityReviewCount: number;
  verifiedUsers: number;
  pins: EvidenceMapPin[];
  reviews: Review[];
}

export interface AssistantAction {
  label: string;
  kind: "button" | "navigation";
  targetPath?: string;
}

export interface AssistantProductCta {
  label: string;
  productId: string;
  targetPath: string;
}

export interface AssistantContext {
  route: RouteKey;
  conversationScope: string;
  mode: "standard" | "clean";
  primaryMessage?: string;
  secondaryMessages: string[];
  actions: AssistantAction[];
  productCta?: AssistantProductCta;
  decisionCard?: {
    title: string;
    body: string;
    productCode: string;
    targetPath: string;
  };
}

export interface OutcomeMetric {
  label: string;
  value: string;
  delta: string;
}
