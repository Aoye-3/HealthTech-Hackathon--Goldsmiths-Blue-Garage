import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Review } from "../../types";
import { EvidenceCard } from "./EvidenceCard";

interface ReviewScrollerProps {
  onReviewSelect?: (review: Review) => void;
  reviews: Review[];
}

export function ReviewScroller({ onReviewSelect, reviews }: ReviewScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateScrollState = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setCanScroll(maxScroll > 1);
      setScrollPercent(maxScroll > 0 ? Number(((track.scrollLeft / maxScroll) * 100).toFixed(2)) : 0);
    };

    const scheduleScrollState = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateScrollState();
      });
    };

    updateScrollState();
    track.addEventListener("scroll", scheduleScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      track.removeEventListener("scroll", scheduleScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [reviews.length]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const track = trackRef.current;
    if (!track) return;

    const nextValue = Number(event.target.value);
    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollLeft = (maxScroll * nextValue) / 100;
    setScrollPercent(nextValue);
  };

  return (
    <div className="review-scroller">
      <div
        className="review-track"
        ref={trackRef}
        aria-label="Verified clinician review carousel"
      >
        {reviews.map((review) => (
          <EvidenceCard
            key={review.id}
            review={review}
            onClick={onReviewSelect ? () => onReviewSelect(review) : undefined}
          />
        ))}
      </div>
      {canScroll ? (
        <label className="review-scroll-control">
          <span>Review position</span>
          <input
            aria-label="Scroll clinician reviews"
            max="100"
            min="0"
            onChange={handleSliderChange}
            step="0.1"
            type="range"
            value={scrollPercent}
          />
        </label>
      ) : null}
    </div>
  );
}
