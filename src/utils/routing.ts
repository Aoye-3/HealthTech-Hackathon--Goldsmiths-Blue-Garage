import type { RouteKey } from "../types";

export function getRouteKey(pathname: string): RouteKey {
  if (pathname.startsWith("/shortlist")) return "shortlist";
  if (pathname.startsWith("/compare")) return "compare";
  if (pathname.startsWith("/peer-evidence")) return "peer-evidence";
  if (pathname.startsWith("/approval-pack")) return "approval-pack";
  if (pathname.startsWith("/outcomes")) return "outcomes";
  return "need-definition";
}

export function getProductIdFromPath(pathname: string) {
  const [, route, productId] = pathname.split("/");
  if ((route === "shortlist" || route === "peer-evidence") && productId) {
    return decodeURIComponent(productId);
  }
  return undefined;
}

export function buildShortlistDetailPath(productId: string) {
  return `/shortlist/${encodeURIComponent(productId)}`;
}

export function buildPeerEvidencePath(productId: string) {
  return `/peer-evidence/${encodeURIComponent(productId)}`;
}

export function navigateTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function money(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}
