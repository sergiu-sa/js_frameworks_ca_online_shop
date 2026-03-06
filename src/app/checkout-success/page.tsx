// Checkout success page

'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 sm:px-6">
      <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-center">
      <CheckCircle className="size-16 text-success" />
      <h1 className="mt-6 font-heading text-2xl text-gray-900 sm:text-display">
        Order Confirmed!
      </h1>
      <p className="mt-4 text-body text-gray-600">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Button asChild size="lg" className="mt-8 bg-brand text-white hover:bg-brand-hover">
        <Link href="/">Continue Shopping</Link>
      </Button>
      </div>
    </div>
  );
}
