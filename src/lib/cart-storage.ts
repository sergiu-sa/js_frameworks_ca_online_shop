/**
 * Side-effect boundary for cart persistence.
 * loadCart validates whatever is in localStorage before trusting it, so corrupted or outdated data can never put the app into an invalid state.
 */

import { cartItemsSchema, type CartItem } from '@/types/cart';

const STORAGE_KEY = 'ecom-cart';

export function loadCart(): CartItem[] {
  let stored: string | null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage may be unavailable
    return [];
  }
  if (!stored) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    const result = cartItemsSchema.safeParse(parsed);
    if (result.success) return result.data;
  } catch {
    // Falls through to the cleanup below.
  }

  // Stored data is corrupt or malformed — drop it rather than trusting it.
  localStorage.removeItem(STORAGE_KEY);
  return [];
}

export function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be unavailable (private mode, quota) — fail silently.
  }
}
