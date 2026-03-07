'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { SortSelect, type SortOption } from '@/components/search/SortSelect';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/product';

// Sort products by the selected option
function sortProducts(products: Product[], sort: SortOption): Product[] {
  if (sort === 'default') return products;

  return [...products].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.discountedPrice - b.discountedPrice;
      case 'price-desc':
        return b.discountedPrice - a.discountedPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
}

interface HomepageClientProps {
  products: Product[];
}

// Orchestrates search, sort, and product display on the homepage.
export function HomepageClient({ products }: HomepageClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [showDropdown, setShowDropdown] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useSearch(products, query);
  const isSearching = query.length >= 1;
  const filtered = isSearching ? results : products;
  const displayedProducts = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  function handleQueryChange(value: string): void {
    setQuery(value);
    setShowDropdown(value.length >= 1);
  }

  function handleSelect(id: string): void {
    setShowDropdown(false);
    setQuery('');
    router.push(`/product/${id}`);
  }

  function handleClearSearch(): void {
    setQuery('');
    setShowDropdown(false);
  }

  const handleCloseDropdown = useCallback(() => {
    setShowDropdown(false);
  }, []);

  // "View all" closes the dropdown and scrolls to the results grid
  const handleViewAll = useCallback(() => {
    setShowDropdown(false);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <div className="relative mb-10 rounded-2xl border border-gray-100 bg-white/70 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <SearchBar query={query} onQueryChange={handleQueryChange} />
            <SearchResults
              results={results}
              query={query}
              onSelect={handleSelect}
              onViewAll={handleViewAll}
              visible={showDropdown}
              onClose={handleCloseDropdown}
            />
          </div>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      {isSearching && (
        <div ref={resultsRef} className="mb-4 flex items-center justify-between">
          <p className="text-body-sm text-gray-500">
            {results.length} {results.length === 1 ? 'result' : 'results'} for
            &ldquo;{query}&rdquo;
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="text-body-sm text-gray-500 hover:text-gray-900"
          >
            Clear search
          </Button>
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white/70 p-4">
        {isSearching && displayedProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            description={`We couldn\u2019t find any products matching \u201c${query}\u201d. Try a different search term.`}
            action={
              <Button
                onClick={handleClearSearch}
                className="bg-brand text-white hover:bg-brand-hover"
              >
                Show All Products
              </Button>
            }
          />
        ) : (
          <ProductGrid products={displayedProducts} />
        )}
      </div>
    </>
  );
}
