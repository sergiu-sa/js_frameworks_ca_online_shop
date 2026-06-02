import { describe, it, expect } from 'vitest';
import {
  cartReducer,
  initialCartState,
  getTotalItems,
  getTotalPrice,
} from './cartReducer';
import type { CartItem, CartState } from '@/types/cart';

function makeItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: '1',
    title: 'Wool Throw',
    price: 100,
    discountedPrice: 80,
    image: { url: 'https://example.com/throw.jpg', alt: 'Wool throw' },
    quantity: 1,
    ...overrides,
  };
}

describe('cartReducer', () => {
  it('adds a new item with quantity 1', () => {
    const next = cartReducer(initialCartState, {
      type: 'ADD_ITEM',
      payload: makeItem({ quantity: 5 }),
    });
    expect(next.items).toHaveLength(1);
    expect(next.items[0].quantity).toBe(1);
  });

  it('increments quantity when adding an item already in the cart', () => {
    const state: CartState = { items: [makeItem({ quantity: 2 })] };
    const next = cartReducer(state, { type: 'ADD_ITEM', payload: makeItem() });
    expect(next.items).toHaveLength(1);
    expect(next.items[0].quantity).toBe(3);
  });

  it('removes an item by id', () => {
    const state: CartState = {
      items: [makeItem({ id: '1' }), makeItem({ id: '2' })],
    };
    const next = cartReducer(state, {
      type: 'REMOVE_ITEM',
      payload: { id: '1' },
    });
    expect(next.items.map((i) => i.id)).toEqual(['2']);
  });

  it('updates the quantity of an existing item', () => {
    const state: CartState = { items: [makeItem({ quantity: 1 })] };
    const next = cartReducer(state, {
      type: 'UPDATE_QUANTITY',
      payload: { id: '1', quantity: 4 },
    });
    expect(next.items[0].quantity).toBe(4);
  });

  it('removes the item when quantity is updated to zero or below', () => {
    const state: CartState = { items: [makeItem()] };
    const next = cartReducer(state, {
      type: 'UPDATE_QUANTITY',
      payload: { id: '1', quantity: 0 },
    });
    expect(next.items).toHaveLength(0);
  });

  it('clears the cart', () => {
    const state: CartState = { items: [makeItem(), makeItem({ id: '2' })] };
    expect(cartReducer(state, { type: 'CLEAR_CART' }).items).toHaveLength(0);
  });

  it('replaces items on hydrate', () => {
    const state: CartState = { items: [makeItem()] };
    const next = cartReducer(state, {
      type: 'HYDRATE',
      payload: [makeItem({ id: '9', quantity: 2 })],
    });
    expect(next.items).toEqual([makeItem({ id: '9', quantity: 2 })]);
  });

  it('does not mutate the previous state', () => {
    const state: CartState = { items: [makeItem()] };
    cartReducer(state, { type: 'ADD_ITEM', payload: makeItem() });
    expect(state.items[0].quantity).toBe(1);
  });
});

describe('cart selectors', () => {
  it('sums quantities for total items', () => {
    const items = [makeItem({ quantity: 2 }), makeItem({ id: '2', quantity: 3 })];
    expect(getTotalItems(items)).toBe(5);
  });

  it('sums discounted price times quantity for total price', () => {
    const items = [
      makeItem({ discountedPrice: 80, quantity: 2 }),
      makeItem({ id: '2', discountedPrice: 50, quantity: 1 }),
    ];
    expect(getTotalPrice(items)).toBe(210);
  });

  it('returns zero totals for an empty cart', () => {
    expect(getTotalItems([])).toBe(0);
    expect(getTotalPrice([])).toBe(0);
  });
});
