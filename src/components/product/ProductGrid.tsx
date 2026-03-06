// Responsive product grid 
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index === 0} />
      ))}
    </div>
  );
}
