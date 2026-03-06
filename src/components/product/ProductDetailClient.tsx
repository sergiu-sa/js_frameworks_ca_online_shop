'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/Tag';
import { PriceDisplay } from '@/components/product/PriceDisplay';
import { RatingStars } from '@/components/product/RatingStars';
import { DiscountBadge } from '@/components/product/DiscountBadge';
import { ReviewList } from '@/components/product/ReviewList';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(product.id);
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart(): void {
    const currentInCart = getItemQuantity(product.id);
    if (currentInCart === 0) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice,
        image: product.image,
      });
      if (quantity > 1) {
        updateQuantity(product.id, quantity);
      }
    } else {
      updateQuantity(product.id, currentInCart + quantity);
    }
    toast.success(
      `${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`
    );
    setQuantity(1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg md:sticky md:top-24">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <DiscountBadge
            price={product.price}
            discountedPrice={product.discountedPrice}
          />
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
          <div>
            <h1 className="font-heading text-2xl text-gray-900 sm:text-display">
              {product.title}
            </h1>
            <div className="mt-3">
              <RatingStars rating={product.rating} />
            </div>
          </div>

          <div>
            <PriceDisplay
              price={product.price}
              discountedPrice={product.discountedPrice}
            />
          </div>

          <p className="text-body text-gray-600">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-12 text-center text-body font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-brand text-white hover:bg-brand-hover"
              >
                Add to Cart
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => router.push('/')}
            >
              Back to Products
            </Button>
            {quantityInCart > 0 && (
              <p className="text-body-sm text-gray-500">
                {quantityInCart} already in cart
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="mb-6 font-heading text-heading-lg text-gray-900">
          Customer Reviews
        </h2>
        <ReviewList reviews={product.reviews} />
      </section>
    </div>
  );
}
