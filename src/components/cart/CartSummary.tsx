// Order summary sidebar on the cart page

'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export function CartSummary() {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
      <h2 className="font-heading text-heading text-gray-900">
        Order Summary
      </h2>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-body-sm text-gray-600">
          <span>Items ({totalItems})</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between text-body font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>
      <Button
        asChild
        size="lg"
        className="mt-6 w-full bg-brand text-white hover:bg-brand-hover"
      >
        <Link href="/checkout" className="flex items-center justify-center gap-2">
          Proceed to Checkout
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
