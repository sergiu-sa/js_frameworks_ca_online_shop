/**
 * Cart state types
 * CartItem holds product snapshot data needed for display and price calculation.
 * The schema is also used to validate cart data restored from localStorage.
 * CartAction is a discriminated union of all reducer action types.
 */

import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  discountedPrice: z.number(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  quantity: z.number().int().positive(),
});

export const cartItemsSchema = z.array(cartItemSchema);

export type CartItem = z.infer<typeof cartItemSchema>;

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] };
