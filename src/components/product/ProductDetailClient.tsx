'use client';

import Image from 'next/image';
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

export function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const { addItem, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(product.id);

  function handleAddToCart(): void {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      image: product.image,
    });
    toast.success(`${product.title} added to cart`);
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

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-heading text-display text-gray-900">
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

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-brand text-white hover:bg-brand-hover sm:w-auto"
            >
              Add to Cart
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
