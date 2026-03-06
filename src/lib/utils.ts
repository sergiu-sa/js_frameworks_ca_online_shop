// Shared utility functions used across the application.

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes with conflict resolution (via tailwind-merge)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calculateDiscountPercent(
  price: number,
  discountedPrice: number
): number {
  if (discountedPrice >= price) return 0;
  return Math.round(((price - discountedPrice) / price) * 100);
}

export function hasDiscount(price: number, discountedPrice: number): boolean {
  return discountedPrice < price;
}
