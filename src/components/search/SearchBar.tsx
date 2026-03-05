'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand" />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="What are you looking for?"
        aria-label="Search products"
        className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-body text-gray-900 shadow-card outline-none transition-all placeholder:text-gray-400 focus:border-brand focus:shadow-card-hover focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}
