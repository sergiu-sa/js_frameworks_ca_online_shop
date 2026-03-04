'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/product';

interface HomepageClientProps {
  products: Product[];
}

export function HomepageClient({ products }: HomepageClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const results = useSearch(products, debouncedQuery);

  const isSearching = debouncedQuery.length >= 2;
  const displayedProducts = isSearching ? results : products;

  function handleQueryChange(value: string): void {
    setQuery(value);
    setShowResults(value.length >= 2);
  }

  function handleSelect(id: string): void {
    setShowResults(false);
    setQuery('');
    router.push(`/product/${id}`);
  }

  function handleClearSearch(): void {
    setQuery('');
    setShowResults(false);
  }

  const handleClose = useCallback(() => {
    setShowResults(false);
  }, []);

  return (
    <>
      <div className="relative mb-8">
        <SearchBar query={query} onQueryChange={handleQueryChange} />
        <SearchResults
          results={results}
          query={debouncedQuery}
          onSelect={handleSelect}
          visible={showResults}
          onClose={handleClose}
        />
      </div>

      {isSearching && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-body-sm text-gray-500">
            {results.length} {results.length === 1 ? 'result' : 'results'} for
            &ldquo;{debouncedQuery}&rdquo;
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

      {isSearching && displayedProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          description={`We couldn\u2019t find any products matching \u201c${debouncedQuery}\u201d. Try a different search term.`}
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
    </>
  );
}
