// Homepage error boundary that is shown when the product fetch fails.

'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomeError({
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
          We couldn&apos;t load the products. Please try again.
        </p>
        <Button onClick={reset} className="mt-6 bg-brand hover:bg-brand-hover">
          <RefreshCw className="mr-2 size-4" aria-hidden="true" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
