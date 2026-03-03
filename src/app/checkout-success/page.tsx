'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <CheckCircle className="size-16 text-green-500" />
      <h1 className="mt-6 font-heading text-display text-gray-900">
        Order Confirmed!
      </h1>
      <p className="mt-4 text-body text-gray-600">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Button asChild size="lg" className="mt-8 bg-brand text-white hover:bg-brand-hover">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}
