/** Filters products by title match against a search query. Returns empty array when query is empty. */

import { useMemo } from 'react';
import type { Product } from '@/types/product';

export function useSearch(products: Product[], query: string): Product[] {
  return useMemo(() => {
    if (query.length < 1) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter((product) =>
      product.title.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);
}
