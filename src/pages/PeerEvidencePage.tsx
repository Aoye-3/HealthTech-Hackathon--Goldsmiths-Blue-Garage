import { MessageSquare, Star, Users } from "lucide-react";
import { MetricCard } from "../components/procurement/MetricCard";
import { ReviewScroller } from "../components/procurement/ReviewScroller";
import { productEvidenceProfiles, products } from "../data/procurementData";
import { buildClinicianReviewPath, getProductIdFromPath, money, navigateTo } from "../utils/routing";

interface PeerEvidencePageProps {
  pathname: string;
}

export function PeerEvidencePage({ pathname }: PeerEvidencePageProps) {
  const productId = getProductIdFromPath(pathname);
  const product = products.find((item) => item.id === productId) ?? products[1];
  const profile = productEvidenceProfiles[product.id] ?? productEvidenceProfiles[products[1].id];

  return (
    <div className="page-stack peer-evidence-page">
      <section className="peer-fixed-info" aria-label="Selected product evidence context">
        <div className="page-heading peer-evidence-heading">
          <div>
            <button className="link-button" type="button" onClick={() => navigateTo(`/shortlist/${product.id}`)}>
              Back to product details
            </button>
            <h1>{profile.organisationName}</h1>
          </div>
          <div className="peer-evidence-title">
            <span>{profile.evidenceTitle}</span>
            <p>{profile.evidenceSummary}</p>
          </div>
        </div>
        <div className="product-evidence-header">
          <div className={`product-image ${product.imageTone}`}><span>{product.brand.slice(0, 2).toUpperCase()}</span></div>
          <div>
            <span className="soft-badge">NHS reviewed</span>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
          </div>
          <MetricCard label="AI match" value={`${product.fitScore}%`} detail="Very strong fit" tone="green" />
          <MetricCard label="Clinician rating" value={`${product.rating} / 5`} detail={`${product.verifiedReviews} verified reviews`} tone="amber" />
          <MetricCard label="Price range" value={`${money(product.benchmarkLow)} - ${money(product.benchmarkHigh)}`} detail="Based on supplier quotes" tone="blue" />
        </div>
      </section>
      <div className="peer-evidence-content">
        <div className="evidence-layout">
          <section className="map-panel">
            <div className="map-heading">
              <h2>{profile.mapTitle}</h2>
              <span>{profile.mapSubtitle}</span>
            </div>
            <div className="map-canvas">
              {profile.pins.map((pin) => (
                <span
                  className={`map-pin ${pin.tone}`}
                  key={`${product.id}-${pin.label}-${pin.x}-${pin.y}`}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  {pin.label}
                </span>
              ))}
              <div className="implementation-count">
                <strong>{profile.activeLeads}</strong>
                <span>Leads Active</span>
              </div>
            </div>
          </section>
          <section className="evidence-summary">
            <MetricCard
              icon={Star}
              label="Evidence credibility"
              value={`${profile.credibilityScore.toFixed(1)} / 5`}
              detail={`Based on ${profile.credibilityReviewCount} clinical reviews`}
              tone="amber"
            />
            <MetricCard icon={Users} label="Verified NHS users" value={`${profile.verifiedUsers}`} detail="Across PCNs and practices" tone="teal" />
            <button className="primary full" type="button">
              <MessageSquare size={16} />
              Request peer conversation
            </button>
          </section>
        </div>
        <section className="peer-review-section">
          <h2 className="small-heading">Verified clinician reviews</h2>
          <ReviewScroller
            reviews={profile.reviews}
            onReviewSelect={(review) => navigateTo(buildClinicianReviewPath(product.id, review.id))}
          />
        </section>
      </div>
    </div>
  );
}
