import { CheckCircle2, Info } from "lucide-react";
import type { Product } from "../../types";
import { money } from "../../utils/routing";

interface ComparisonTableProps {
  products: Product[];
}

export function ComparisonTable({ products }: ComparisonTableProps) {
  const rows = [
    { label: "Unit price", values: products.map((product) => money(product.unitPrice)) },
    { label: "Supplier", values: products.map((product) => product.supplier) },
    { label: "Warranty", values: products.map((product) => product.warranty) },
    { label: "Integration", values: products.map((product) => product.integration) },
    { label: "NHS organisations using it", values: products.map((product) => String(product.organisationsUsing)) },
    { label: "Verified clinician score", values: products.map((product) => `${product.clinicianScore.toFixed(1)} / 5`) },
    { label: "Implementation support", values: products.map((product) => product.implementationSupport) },
    { label: "Estimated annual cost", values: products.map((product) => money(product.annualCost)) }
  ];

  return (
    <div className="comparison-table" role="table" aria-label="Product comparison">
      <div className="comparison-head" role="row">
        <span role="columnheader">Criteria</span>
        {products.map((product, index) => (
          <strong className={index === 1 ? "recommended" : ""} key={product.id} role="columnheader">
            {index === 1 ? <CheckCircle2 size={15} /> : null}
            {product.name}
          </strong>
        ))}
      </div>
      {rows.map((row) => (
        <div className="comparison-row" key={row.label} role="row">
          <span role="cell">
            <Info size={14} />
            {row.label}
          </span>
          {row.values.map((value, index) => (
            <strong className={index === 1 ? "recommended-cell" : ""} key={`${row.label}-${index}`} role="cell">
              {value}
            </strong>
          ))}
        </div>
      ))}
    </div>
  );
}
