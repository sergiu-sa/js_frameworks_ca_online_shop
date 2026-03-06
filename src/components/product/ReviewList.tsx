/** Renders a list of review cards, or an empty state when there are no reviews. */

import { ReviewCard } from '@/components/product/ReviewCard';
import { EmptyState } from '@/components/ui/EmptyState';
import type { Review } from '@/types/product';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        title="No reviews yet"
        description="Be the first to share your thoughts on this product."
      />
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
