// Homepage

import { getAllProducts } from '@/lib/api';
import { HeroSection } from '@/components/home/HeroSection';
import { HomepageClient } from '@/components/search/HomepageClient';

export default async function Home() {
  // A failed fetch throws and is handled by error.tsx, which shows a clear
  // message and a Retry button instead of a silently swallowed error.
  const products = await getAllProducts();

  return (
    <>
      <HeroSection products={products} />
      <div
        id="products"
        className="scroll-mt-20 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <h2 className="mb-8 font-heading text-2xl text-gray-900 sm:text-display">
          Discover Our Products
        </h2>
        <HomepageClient products={products} />
      </div>
    </>
  );
}
