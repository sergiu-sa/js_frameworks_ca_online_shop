//  CartItem

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/cart/QuantitySelector';
import { formatCurrency } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  function handleRemove(): void {
    onRemove(item.id);
    toast.success(`${item.title} removed from cart`);
  }

  return (
    <div className="flex gap-4 border-b border-gray-200 py-4">
      <Link
        href={`/product/${item.id}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg"
      >
        <Image
          src={item.image.url}
          alt={item.image.alt || item.title}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${item.id}`}
            className="text-body-sm font-medium text-gray-900 hover:text-brand"
          >
            {item.title}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-gray-400 hover:text-red-500"
            onClick={handleRemove}
            aria-label={`Remove ${item.title} from cart`}
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={(qty) => onUpdateQuantity(item.id, qty)}
          />
          <p className="text-body-sm font-semibold text-gray-900">
            {formatCurrency(item.discountedPrice * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
