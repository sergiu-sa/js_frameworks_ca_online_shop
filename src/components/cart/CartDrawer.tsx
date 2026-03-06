'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/cart/QuantitySelector';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } =
    useCart();

  function handleRemove(id: string, title: string): void {
    removeItem(id);
    toast.success(`${title} removed from cart`);
  }

  function handleCheckout(): void {
    clearCart();
    onOpenChange(false);
    router.push('/checkout-success');
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-heading-sm">
            <ShoppingCart className="size-5" />
            Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4">
            <p className="text-body-sm text-gray-500">Your cart is empty</p>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-brand text-white hover:bg-brand-hover"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b border-gray-100 py-3">
                  <Link
                    href={`/product/${item.id}`}
                    onClick={() => onOpenChange(false)}
                    className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-gray-100"
                  >
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.id}`}
                        onClick={() => onOpenChange(false)}
                        className="line-clamp-2 text-body-sm font-medium text-gray-900 hover:text-brand"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => handleRemove(item.id, item.title)}
                        className="shrink-0 text-gray-400 transition-colors hover:text-red-500"
                        aria-label={`Remove ${item.title}`}
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                      />
                      <span className="text-body-sm font-semibold text-gray-900">
                        {formatCurrency(item.discountedPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-body font-medium text-gray-900">Total</span>
                <span className="text-body font-bold text-gray-900">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full bg-brand text-white hover:bg-brand-hover"
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                asChild
              >
                <Link href="/cart" onClick={() => onOpenChange(false)}>
                  View Full Cart
                </Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
