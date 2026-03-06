/** Controlled search input */

'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand sm:left-4 sm:size-5" />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-xl border border-brand/30 bg-white py-2.5 pl-10 pr-3 text-body-sm text-gray-900 shadow-card outline-none transition-all placeholder:text-gray-400 focus:border-brand focus:shadow-card-hover focus:ring-2 focus:ring-brand/20 sm:py-3.5 sm:pl-12 sm:pr-4 sm:text-body"
      />
    </div>
  );
}
