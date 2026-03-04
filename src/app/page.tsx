import { getAllProducts } from '@/lib/api';
import { HomepageClient } from '@/components/search/HomepageClient';

export default async function Home() {
  let products = null;

  try {
    products = await getAllProducts();
  } catch {
    // API request failed
  }

  if (!products) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-error/50 bg-error/10 p-6 text-center">
          <h2 className="text-heading-sm font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-body-sm text-gray-500">
            Failed to load products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-heading text-display text-gray-900">
        Discover Our Products
      </h1>
      <HomepageClient products={products} />
    </div>
  );
}
