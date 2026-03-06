/** Search dropdown   */

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types/product';

interface SearchResultsProps {
  results: Product[];
  query: string;
  onSelect: (id: string) => void;
  onViewAll: () => void;
  visible: boolean;
  onClose: () => void;
}

export function SearchResults({
  results,
  query,
  onSelect,
  onViewAll,
  visible,
  onClose,
}: SearchResultsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') onClose();
    }

    function handleClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible || query.length < 1) return null;

  const displayed = results.slice(0, 4);

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-lg bg-white shadow-dropdown animate-slide-down"
    >
      {displayed.length === 0 ? (
        <p className="px-4 py-6 text-center text-body-sm text-gray-500">
          No results found
        </p>
      ) : (
        <>
          <ul>
            {displayed.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => onSelect(product.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                >
                  <div className="relative size-10 shrink-0 overflow-hidden rounded">
                    <Image
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="flex-1 truncate text-body-sm font-medium text-gray-900">
                    {product.title}
                  </span>
                  <span className="shrink-0 text-body-sm font-semibold text-gray-700">
                    {formatCurrency(product.discountedPrice)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {results.length > displayed.length && (
            <button
              type="button"
              onClick={onViewAll}
              className="w-full border-t border-gray-100 px-4 py-3 text-center text-body-sm font-medium text-brand transition-colors hover:bg-gray-50"
            >
              View all {results.length} results
            </button>
          )}
        </>
      )}
    </div>
  );
}
