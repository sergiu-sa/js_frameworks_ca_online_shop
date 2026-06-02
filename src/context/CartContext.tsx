'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { CartItem } from '@/types/cart';
import {
  cartReducer,
  initialCartState,
  getTotalItems,
  getTotalPrice,
} from './cartReducer';
import { loadCart, saveCart } from '@/lib/cart-storage';

// --- SSR hydration guard ---
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: {
    id: string;
    title: string;
    price: number;
    discountedPrice: number;
    image: { url: string; alt: string };
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const mounted = useMounted();

  // Hydrate from localStorage on mount (validated inside loadCart)
  useEffect(() => {
    dispatch({ type: 'HYDRATE', payload: loadCart() });
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    if (mounted) {
      saveCart(state.items);
    }
  }, [state.items, mounted]);

  const totalItems = getTotalItems(state.items);
  const totalPrice = getTotalPrice(state.items);

  function addItem(product: {
    id: string;
    title: string;
    price: number;
    discountedPrice: number;
    image: { url: string; alt: string };
  }): void {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: 1 },
    });
  }

  function removeItem(id: string): void {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }

  function updateQuantity(id: string, quantity: number): void {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }

  const clearCart = useCallback((): void => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  function getItemQuantity(productId: string): number {
    return state.items.find((item) => item.id === productId)?.quantity ?? 0;
  }

  return (
    /* Return empty values until client-side hydration completes to avoid SSR mismatch */
    <CartContext.Provider
      value={{
        items: mounted ? state.items : [],
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems: mounted ? totalItems : 0,
        totalPrice: mounted ? totalPrice : 0,
        getItemQuantity: mounted
          ? getItemQuantity
          : () => 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
