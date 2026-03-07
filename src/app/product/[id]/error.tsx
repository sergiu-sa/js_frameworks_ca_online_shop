//  Product detail error boundary

'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <AlertTriangle className="size-12 text-warning" aria-hidden="true" />
        <h2 className="mt-4 font-heading text-heading-lg text-gray-900">
          Something went wrong
        </h2>
        <p className="mt-2 text-body text-gray-500">
          We couldn&apos;t load this product. Please try again.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button onClick={reset} className="bg-brand text-white hover:bg-brand-hover">
            <RefreshCw className="mr-2 size-4" aria-hidden="true" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
