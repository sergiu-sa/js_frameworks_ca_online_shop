'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          action={
            <Button asChild className="bg-brand text-white hover:bg-brand-hover">
              <Link href="/">Continue Shopping</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl text-gray-900 sm:text-display">
        Shopping Cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 lg:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
