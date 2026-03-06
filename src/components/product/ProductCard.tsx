'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { PriceDisplay } from '@/components/product/PriceDisplay';
import { RatingStars } from '@/components/product/RatingStars';
import { DiscountBadge } from '@/components/product/DiscountBadge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  function handleAddToCart(e: React.MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
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
    <Link href={`/product/${product.id}`}>
      <div className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
        <div className="relative aspect-4/5 bg-gray-100">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <DiscountBadge
            price={product.price}
            discountedPrice={product.discountedPrice}
          />
          <Button
            size="sm"
            className="absolute bottom-3 right-3 bg-brand text-white opacity-0 shadow-lg transition-opacity duration-200 hover:bg-brand-hover group-hover:opacity-100"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart className="mr-1.5 size-3.5" />
            Add
          </Button>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-heading-sm font-semibold text-gray-800">
            {product.title}
          </h3>
          <div className="mt-2">
            <RatingStars rating={product.rating} />
          </div>
          <div className="mt-2">
            <PriceDisplay
              price={product.price}
              discountedPrice={product.discountedPrice}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
