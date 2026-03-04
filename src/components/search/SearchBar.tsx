'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg bg-gray-100 py-3 pl-12 pr-4 text-body text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border focus:border-gray-300 focus:bg-white"
      />
    </div>
  );
}
