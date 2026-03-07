import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/product';

interface HeroSectionProps {
  products?: Product[];
}

export function HeroSection({ products }: HeroSectionProps) {
  const topRated = (products ?? [])
    .filter((p) => p.image?.url)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-14 lg:pt-12 2xl:max-w-400">
        {/* Line 1 */}
        <h1 className="animate-hero-fade-in font-heading text-[clamp(3.2rem,9vw,9rem)] leading-[0.92] tracking-[-0.03em] text-[#1A1A2E]">
          Style,
        </h1>

        {/* Line 2: headline */}
        <span className="animate-hero-fade-in block font-heading text-[clamp(3.2rem,9vw,9rem)] leading-[0.92] tracking-[-0.03em] text-[#1A1A2E] [animation-delay:80ms]">
          Essentialized.
        </span>

        {/* Tagline + CTA on same line */}
        <div className="animate-hero-fade-in mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 [animation-delay:140ms]">
          <p className="text-body-sm text-gray-600 sm:text-body-md">
            The toolkit for your life. From the gear you carry to the clothes you wear.
          </p>
          <Button
            asChild
            size="lg"
            className="group shrink-0 rounded-full bg-brand px-7 text-white shadow-lg hover:bg-brand-hover"
          >
            <a href="#products" className="flex items-center gap-2">
              Shop Now
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>

        {/* Gradient panel with product cards overlaid */}
        <div className="animate-hero-fade-in relative mt-5 aspect-[2.4/1] w-full overflow-hidden sm:mt-6 [animation-delay:200ms]">
          {/* Hero image */}
          <Image
            src="/hero.png"
            alt="Flowing orange fabric"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />

          {/* Mini product cards */}
          {topRated.length > 0 && (
            <div className="absolute bottom-5 left-5 hidden items-end gap-3.5 sm:flex lg:bottom-6 lg:left-6 lg:gap-4">
              {topRated.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="animate-hero-fade-in group block w-20 overflow-hidden rounded-md border-2 border-brand bg-white shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/20 sm:w-28 lg:w-35"
                  style={{ animationDelay: `${350 + i * 80}ms` }}
                >
                  <div className="relative aspect-square bg-[#faf8f5] p-2 sm:p-2.5">
                    <Image
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                      fill
                      sizes="(max-width: 640px) 80px, 140px"
                      className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-white px-2 py-1.5 sm:px-3 sm:py-2">
                    <p className="truncate text-[8px] font-medium text-gray-800 sm:text-[11px] lg:text-xs">
                      {product.title}
                    </p>
                    <p className="mt-0.5 text-[8px] font-semibold text-brand sm:text-[11px] lg:text-xs">
                      ${product.discountedPrice.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
