import { describe, it, expect, beforeEach } from 'vitest';
import { loadCart, saveCart } from './cart-storage';
import type { CartItem } from '@/types/cart';

const STORAGE_KEY = 'ecom-cart';

const validItem: CartItem = {
  id: '1',
  title: 'Wool Throw',
  price: 100,
  discountedPrice: 80,
  image: { url: 'https://example.com/throw.jpg', alt: 'Wool throw' },
  quantity: 2,
};

beforeEach(() => {
  localStorage.clear();
});

describe('loadCart', () => {
  it('returns an empty array when nothing is stored', () => {
    expect(loadCart()).toEqual([]);
  });

  it('returns valid stored items', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([validItem]));
    expect(loadCart()).toEqual([validItem]);
  });

  it('returns an empty array and clears the key when JSON is corrupt', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json');
    expect(loadCart()).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('returns an empty array when the shape is invalid', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: '1', quantity: 'lots' }])
    );
    expect(loadCart()).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('rejects a non-positive quantity', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ ...validItem, quantity: 0 }])
    );
    expect(loadCart()).toEqual([]);
  });
});

describe('saveCart', () => {
  it('round-trips through loadCart', () => {
    saveCart([validItem]);
    expect(loadCart()).toEqual([validItem]);
  });
});
