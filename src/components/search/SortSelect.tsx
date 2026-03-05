'use client';

import { ChevronDown } from 'lucide-react';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Sort by' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name: A–Z' },
];

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        aria-label="Sort products"
        className="appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pl-4 pr-10 text-body-sm font-medium text-gray-700 shadow-card outline-none transition-all focus:border-brand focus:shadow-card-hover focus:ring-2 focus:ring-brand/20"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
    </div>
  );
}
