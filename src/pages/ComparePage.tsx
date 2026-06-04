import { AlertTriangle, ArrowRight, BadgePoundSterling, MapPinned, Sparkles } from "lucide-react";
import { ComparisonTable } from "../components/procurement/ComparisonTable";
import { products } from "../data/procurementData";
import { buildPeerEvidencePath, money, navigateTo } from "../utils/routing";

export function ComparePage() {
  const comparedProducts = products.slice(0, 3);
  const recommendedProduct = comparedProducts[1];
  const quoted = comparedProducts[2];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="breadcrumb">Shortlist / Evidence comparison</span>
          <h1>Evidence Comparison</h1>
          <p>Compare shortlisted products side by side using verified evidence and commercial data.</p>
        </div>
        <button className="secondary" type="button" onClick={() => navigateTo("/shortlist")}>Edit shortlist</button>
      </div>
      <section className="compare-product-row">
        {comparedProducts.map((product, index) => (
          <article className={index === 1 ? "compare-chip recommended" : "compare-chip"} key={product.id}>
            <span>{String.fromCharCode(65 + index)}</span>
            <div>
              <strong>{product.name}</strong>
              <small>NHS reviewed</small>
            </div>
            <div className={`compare-product-thumb ${product.imageTone}`} aria-hidden="true"><i /></div>
            {index === 1 ? <em>AI recommended</em> : null}
          </article>
        ))}
      </section>
      <div className="compare-layout">
        <ComparisonTable products={comparedProducts} />
        <aside className="comparison-side">
          <article className="price-card">
            <BadgePoundSterling size={21} />
            <h2>Price transparency</h2>
            <strong>{quoted.name}</strong>
            <span>Your quoted price</span>
            <b>{money(quoted.unitPrice)} / unit</b>
            <span>Peer benchmark range</span>
            <p>{money(quoted.benchmarkLow)} - {money(quoted.benchmarkHigh)} / unit</p>
            <div className="warning">
              <AlertTriangle size={17} />
              Above peer benchmark by 12%
            </div>
          </article>
          <article className="recommendation-card">
            <Sparkles size={20} />
            <h2>AI recommendation</h2>
            <p>Product B offers the strongest balance of cost, verified outcomes and implementation support.</p>
            <button className="secondary full" type="button" onClick={() => navigateTo(buildPeerEvidencePath(recommendedProduct.id))}>
              <MapPinned size={16} />
              Review peer evidence
            </button>
            <button className="primary full" type="button" onClick={() => navigateTo("/approval-pack")}>
              Create approval pack
              <ArrowRight size={16} />
            </button>
          </article>
        </aside>
      </div>
    </div>
  );
}
