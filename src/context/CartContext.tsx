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
import type { CartItem, CartState, CartAction } from '@/types/cart';

const STORAGE_KEY = 'ecom-cart';

// --- SSR hydration guard ---
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// --- Cart reducer ---
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    case 'HYDRATE':
      return { items: action.payload };
    default:
      return state;
  }
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
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const mounted = useMounted();

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        dispatch({ type: 'HYDRATE', payload: parsed });
      }
    } catch {
      // Ignore corrupted data
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, mounted]);

  const totalItems = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

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
