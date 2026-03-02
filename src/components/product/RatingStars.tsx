import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
}

export function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < Math.round(rating)
              ? 'fill-brand text-brand'
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-caption text-gray-400">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}
