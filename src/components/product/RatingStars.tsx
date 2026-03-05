import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
}

export function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`size-4 ${
            i < Math.round(rating)
              ? 'fill-brand text-brand'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-caption text-gray-400" aria-hidden="true">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}
