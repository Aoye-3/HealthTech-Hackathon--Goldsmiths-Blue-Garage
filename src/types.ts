import type { LucideIcon } from "lucide-react";

export type RouteKey =
  | "need-definition"
  | "shortlist"
  | "compare"
  | "peer-evidence"
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
  clinician: string;
  role: string;
  organisation: string;
  rating: number;
  quote: string;
  verified: boolean;
}

export interface OutcomeMetric {
  label: string;
  value: string;
  delta: string;
}
