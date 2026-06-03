import { ArrowRight, Filter, ListChecks } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "../components/procurement/ProductCard";
import { clinicalNeed, products } from "../data/procurementData";
import { navigateTo } from "../utils/routing";

export function ShortlistPage() {
  const [selected, setSelected] = useState<string[]>(["surebp-connect"]);

  function toggleProduct(productId: string) {
    setSelected((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
  }

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="breadcrumb">Need definition / Product shortlist</span>
          <h1>Recommended Reviewed Products</h1>
          <p>AI converted the clinical need into a trusted shortlist for first-round selection.</p>
        </div>
        <button className="secondary"><Filter size={16} /> Adjust filters</button>
      </div>
      <section className="context-strip">
        <ListChecks size={18} />
        <span>{clinicalNeed}</span>
      </section>
      <div className="shortlist-layout">
        <section className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              onToggle={toggleProduct}
              product={product}
              selected={selected.includes(product.id)}
            />
          ))}
        </section>
        <aside className="selection-panel">
          <h2>First-round decision</h2>
          <p>{selected.length} products selected for deeper evidence comparison.</p>
          <div className="selected-list">
            {selected.map((id) => {
              const product = products.find((item) => item.id === id);
              return product ? <span key={id}>{product.name}</span> : null;
            })}
          </div>
          <button className="primary full" type="button" onClick={() => navigateTo("/compare")}>
            Continue to comparison
            <ArrowRight size={16} />
          </button>
        </aside>
      </div>
    </div>
  );
}
