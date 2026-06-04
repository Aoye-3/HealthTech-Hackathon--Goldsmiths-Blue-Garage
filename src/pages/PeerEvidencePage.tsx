import { MessageSquare, Star, Users } from "lucide-react";
import { EvidenceCard } from "../components/procurement/EvidenceCard";
import { MetricCard } from "../components/procurement/MetricCard";
import { peerReviews, products } from "../data/procurementData";
import { getProductIdFromPath, money, navigateTo } from "../utils/routing";

interface PeerEvidencePageProps {
  pathname: string;
}

export function PeerEvidencePage({ pathname }: PeerEvidencePageProps) {
  const productId = getProductIdFromPath(pathname);
  const product = products.find((item) => item.id === productId) ?? products[1];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <button className="link-button" type="button" onClick={() => navigateTo(`/shortlist/${product.id}`)}>
            Back to product details
          </button>
          <h1>Peer Proof</h1>
          <p>Verified clinician reviews, regional adoption and implementation evidence for {product.name}.</p>
        </div>
      </div>
      <section className="product-evidence-header">
        <div className={`product-image ${product.imageTone}`}><span>{product.brand.slice(0, 2).toUpperCase()}</span></div>
        <div>
          <span className="soft-badge">NHS reviewed</span>
          <h2>{product.name}</h2>
          <p>{product.category}</p>
        </div>
        <MetricCard label="AI match" value={`${product.fitScore}%`} detail="Very strong fit" tone="green" />
        <MetricCard label="Clinician rating" value={`${product.rating} / 5`} detail={`${product.verifiedReviews} verified reviews`} tone="amber" />
        <MetricCard label="Price range" value={`${money(product.benchmarkLow)} - ${money(product.benchmarkHigh)}`} detail="Based on supplier quotes" tone="blue" />
      </section>
      <div className="evidence-layout">
        <section className="map-panel">
          <div className="map-heading">
            <h2>London Adoption Map</h2>
            <span>Live deployment tracking across London ICS</span>
          </div>
          <div className="map-canvas">
            <span className="map-pin pin-a">05</span>
            <span className="map-pin pin-b">03</span>
            <span className="map-pin pin-c">08</span>
            <div className="implementation-count">
              <strong>08</strong>
              <span>Leads Active</span>
            </div>
          </div>
        </section>
        <section className="evidence-summary">
          <MetricCard icon={Star} label="Evidence credibility" value="4.8 / 5" detail="Based on 142 clinical reviews" tone="amber" />
          <MetricCard icon={Users} label="Verified NHS users" value={`${product.organisationsUsing}`} detail="Across PCNs and practices" tone="teal" />
          <button className="primary full" type="button">
            <MessageSquare size={16} />
            Request peer conversation
          </button>
        </section>
      </div>
      <section>
        <h2 className="small-heading">Verified clinician reviews</h2>
        <div className="review-grid">
          {peerReviews.map((review) => <EvidenceCard key={review.clinician} review={review} />)}
        </div>
      </section>
    </div>
  );
}
