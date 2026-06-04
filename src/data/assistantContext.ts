import type { AssistantContext, RouteKey } from "../types";
import { buildPeerEvidencePath } from "../utils/routing";
import { products } from "./procurementData";

export function buildAssistantContext(route: RouteKey): AssistantContext {
  const recommendedProduct = products[1];
  const base = {
    route,
    conversationScope: `procurement-workflow:${route}`,
    secondaryMessages: [],
    actions: []
  };

  if (route === "clinician-review") {
    return {
      ...base,
      mode: "clean"
    };
  }

  if (route === "shortlist") {
    return {
      ...base,
      mode: "standard",
      primaryMessage: "This product is evidence-aligned, widely used, and suitable for routine airway care.",
      secondaryMessages: [
        `${recommendedProduct.name} provides an easy to use airway care consumable option.`
      ],
      actions: [
        { label: "First decision", kind: "button" },
        { label: "Continue comparison", kind: "navigation", targetPath: "/compare" },
        { label: "Generate summary", kind: "button" },
        { label: "Ask about risks", kind: "button" }
      ],
      productCta: {
        label: recommendedProduct.catalogueCode,
        productId: recommendedProduct.id,
        targetPath: buildPeerEvidencePath(recommendedProduct.id)
      },
      decisionCard: {
        title: "First decision",
        body: "Get early feedback on whether this product meets your requirements.",
        productCode: recommendedProduct.catalogueCode,
        targetPath: "/compare"
      }
    };
  }

  const standardContexts: Record<Exclude<RouteKey, "shortlist" | "clinician-review">, Pick<AssistantContext, "primaryMessage" | "secondaryMessages" | "actions">> = {
    "need-definition": {
      primaryMessage: "Your request indicates remote monitoring, older patients and multi-practice rollout.",
      secondaryMessages: ["I will only surface NHS-reviewed options with visible evidence."],
      actions: [
        { label: "View rationale", kind: "button" },
        { label: "Generate summary", kind: "button" },
        { label: "Ask about risks", kind: "button" }
      ]
    },
    compare: {
      primaryMessage: "This second-round view compares shortlisted products using quote and evidence criteria.",
      secondaryMessages: ["FAG4279 is above peer benchmark by 12% based on your current quote."],
      actions: [
        { label: "View rationale", kind: "button" },
        { label: "Generate summary", kind: "button" },
        { label: "Ask about risks", kind: "button" }
      ]
    },
    "peer-evidence": {
      primaryMessage: "This evidence view is linked to the selected product detail card.",
      secondaryMessages: ["You can request a direct peer conversation before final approval."],
      actions: [
        { label: "View rationale", kind: "button" },
        { label: "Generate summary", kind: "button" },
        { label: "Ask about risks", kind: "button" }
      ]
    },
    "approval-pack": {
      primaryMessage: "The pack is ready for internal review. Evidence completeness is 94%.",
      secondaryMessages: ["All required quotes and verified peer reviews are attached."],
      actions: [
        { label: "View rationale", kind: "button" },
        { label: "Generate summary", kind: "button" },
        { label: "Ask about risks", kind: "button" }
      ]
    },
    outcomes: {
      primaryMessage: "Issue volume is down 28% this quarter compared to the previous period.",
      secondaryMessages: ["Your feedback will support future NHS procurement decisions."],
      actions: [
        { label: "View rationale", kind: "button" },
        { label: "Generate summary", kind: "button" },
        { label: "Ask about risks", kind: "button" }
      ]
    }
  };

  const context = standardContexts[route];

  return {
    ...base,
    mode: "standard",
    primaryMessage: context.primaryMessage,
    secondaryMessages: context.secondaryMessages,
    actions: context.actions
  };
}
