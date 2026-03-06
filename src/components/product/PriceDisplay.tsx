// Renders the product price — shows discounted + original price 

import { formatCurrency, hasDiscount } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  discountedPrice: number;
}

export function PriceDisplay({ price, discountedPrice }: PriceDisplayProps) {
  if (!hasDiscount(price, discountedPrice)) {
    return (
      <span className="font-bold text-gray-900">{formatCurrency(price)}</span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-bold text-gray-900">
        {formatCurrency(discountedPrice)}
      </span>
      <span className="text-body-sm text-gray-400 line-through">
        {formatCurrency(price)}
      </span>
    </div>
  );
}
