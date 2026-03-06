//  Reusable +/- quantity control

'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="size-9"
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </Button>
      <span className="w-10 text-center text-body-sm font-medium">
        {quantity}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="size-9"
        onClick={() => onQuantityChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
