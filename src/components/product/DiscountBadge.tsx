// Absolute-positioned badge showing the discount percentage. Hidden when there's no discount.

import { calculateDiscountPercent } from '@/lib/utils';

interface DiscountBadgeProps {
  price: number;
  discountedPrice: number;
}

export function DiscountBadge({ price, discountedPrice }: DiscountBadgeProps) {
  const percentage = calculateDiscountPercent(price, discountedPrice);
  if (percentage === 0) return null;

  return (
    <span className="absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-caption font-bold text-white">
      -{percentage}% OFF
    </span>
  );
}
