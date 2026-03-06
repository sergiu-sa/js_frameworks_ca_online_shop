/** Single review card showing username, star rating, and review text. */

import { RatingStars } from '@/components/product/RatingStars';
import type { Review } from '@/types/product';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-body-sm font-semibold text-gray-800">
          {review.username}
        </span>
        <RatingStars rating={review.rating} />
      </div>
      <p className="mt-2 text-body-sm text-gray-600">{review.description}</p>
    </div>
  );
}
