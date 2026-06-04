import { Bell, ChevronLeft, Filter, Info, Search } from "lucide-react";
import { useState } from "react";
import { ProductDetailCard } from "../components/procurement/ProductDetailCard";
import { ProductStack } from "../components/procurement/ProductStack";
import { products } from "../data/procurementData";
import type { ShortlistViewMode } from "../types";
import { buildShortlistDetailPath, getProductIdFromPath, navigateTo } from "../utils/routing";

interface ShortlistPageProps {
  pathname: string;
}

export function ShortlistPage({ pathname }: ShortlistPageProps) {
  const routedProductId = getProductIdFromPath(pathname);
  const routedProduct = products.find((product) => product.id === routedProductId);
  const initialIndex = routedProductId ? Math.max(0, products.findIndex((product) => product.id === routedProductId)) : 1;
  const viewMode: ShortlistViewMode = routedProduct ? "detail" : "stack";
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [selected, setSelected] = useState<string[]>(["fag4212"]);
  const activeProduct = routedProduct ?? products[activeIndex] ?? products[0];

  function toggleProduct(productId: string) {
    setSelected((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
  }

  function viewDetails(productId: string) {
    const nextIndex = products.findIndex((product) => product.id === productId);
    if (nextIndex >= 0) setActiveIndex(nextIndex);
    navigateTo(buildShortlistDetailPath(productId));
  }

  function backToStack() {
    if (activeProduct) {
      const nextIndex = products.findIndex((product) => product.id === activeProduct.id);
      if (nextIndex >= 0) setActiveIndex(nextIndex);
    }
    navigateTo("/shortlist");
  }

  return (
    <div className="page-stack shortlist-page-stack">
      <div className="shortlist-workbench-header">
        <button className="link-button" type="button" onClick={() => navigateTo("/need-definition")}>
          <ChevronLeft size={20} />
          Back to request
        </button>
        <div className="shortlist-title">
          <h1>Product Shortlist</h1>
          <Info size={18} />
        </div>
        <div className="shortlist-tools">
          <button className="link-button" type="button">
            <Search size={21} />
            Search products
          </button>
          <button aria-label="Shortlist notifications" className="ghost icon-only" type="button">
            <Bell size={21} />
          </button>
        </div>
      </div>
      <div className="shortlist-filter-row">
        <span />
        <button className="secondary filter-products-button" type="button">
          <Filter size={18} />
          Filter products
        </button>
      </div>
      <div className="shortlist-layout">
        {viewMode === "detail" && activeProduct ? (
          <ProductDetailCard
            onBackToStack={backToStack}
            onToggle={toggleProduct}
            product={activeProduct}
            selected={selected.includes(activeProduct.id)}
          />
        ) : (
          <ProductStack
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            onToggle={toggleProduct}
            onViewDetails={viewDetails}
            products={products}
            selectedIds={selected}
          />
        )}
      </div>
    </div>
  );
}
