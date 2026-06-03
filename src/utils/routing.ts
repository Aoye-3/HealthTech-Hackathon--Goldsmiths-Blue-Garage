import type { RouteKey } from "../types";

export function getRouteKey(pathname: string): RouteKey {
  if (pathname.startsWith("/shortlist")) return "shortlist";
  if (pathname.startsWith("/compare")) return "compare";
  if (pathname.startsWith("/peer-evidence")) return "peer-evidence";
  if (pathname.startsWith("/approval-pack")) return "approval-pack";
  if (pathname.startsWith("/outcomes")) return "outcomes";
  return "need-definition";
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
