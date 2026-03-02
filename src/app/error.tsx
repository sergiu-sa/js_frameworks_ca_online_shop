'use client';

import { Button } from '@/components/ui/button';

export default function HomeError({
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
          We couldn&apos;t load the products. Please try again.
        </p>
        <Button onClick={reset} className="mt-6 bg-brand hover:bg-brand-hover">
          Try Again
        </Button>
      </div>
    </div>
  );
}
