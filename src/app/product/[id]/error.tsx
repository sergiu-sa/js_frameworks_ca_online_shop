//  Product detail error boundary

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-heading text-heading-lg text-gray-900">
          Something went wrong
        </h2>
        <p className="mt-2 text-body text-gray-500">
          We couldn&apos;t load this product. Please try again.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button onClick={reset} className="bg-brand text-white hover:bg-brand-hover">
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
