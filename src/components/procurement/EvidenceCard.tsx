import { BadgeCheck, Star } from "lucide-react";
import type { Review } from "../../types";

interface EvidenceCardProps {
  interactive?: boolean;
  onClick?: () => void;
  review: Review;
}

export function EvidenceCard({ interactive = false, onClick, review }: EvidenceCardProps) {
  const content = (
    <>
      <div className="review-header">
        <div className="review-avatar">{review.clinician.split(" ").map((part) => part[0]).join("")}</div>
        <div>
          <strong>{review.clinician}</strong>
          <span>{review.role} - {review.organisation}</span>
        </div>
      </div>
      <div className="rating-row compact">
        <Star size={15} fill="currentColor" />
        <strong>{review.rating.toFixed(1)} / 5</strong>
        {review.verified ? (
          <span className="verified">
            <BadgeCheck size={14} />
            Verified purchase
          </span>
        ) : null}
      </div>
      <p>"{review.quote}"</p>
    </>
  );

  if (interactive || onClick) {
    return (
      <button className="evidence-card evidence-card-button" data-review-id={review.id} type="button" onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <article className="evidence-card" data-review-id={review.id}>
      {content}
    </article>
  );
}
