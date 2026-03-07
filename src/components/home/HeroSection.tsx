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
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-14 lg:pt-12">
        {/* Line 1 */}
        <h1 className="animate-hero-fade-in font-heading text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.03em] text-[#1A1A2E]">
          Style,
        </h1>

        {/* Line 2: headline */}
        <span className="animate-hero-fade-in block font-heading text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.03em] text-[#1A1A2E] [animation-delay:80ms]">
          Essentialized.
        </span>

        {/* Tagline + CTA on same line */}
        <div className="animate-hero-fade-in mt-5 flex items-center justify-between gap-4 sm:mt-6 [animation-delay:140ms]">
          <p className="text-body-sm text-gray-400">
            Feel confident in every layer that styles and simplifies your life.
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
          {/* Gradient layers */}
          <div className="absolute inset-0 bg-linear-to-br from-amber-300 via-orange-400 to-orange-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_25%_35%,rgba(255,230,170,0.65),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_75%_65%,rgba(234,88,12,0.3),transparent)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_160deg_at_40%_40%,rgba(255,255,255,0.18)_0deg,transparent_55deg,rgba(255,200,120,0.22)_115deg,transparent_175deg,rgba(255,255,255,0.1)_235deg,transparent_290deg,rgba(251,191,36,0.15)_360deg)]" />
          <div className="absolute -bottom-1/4 -right-1/6 h-2/3 w-2/3 rounded-full bg-linear-to-tl from-amber-200/50 to-transparent blur-3xl" />
          <div className="absolute -left-1/6 -top-1/4 h-1/2 w-1/2 rounded-full bg-linear-to-br from-orange-300/40 to-transparent blur-3xl" />
          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')] bg-size-[128px_128px]" />
          {/* Inner glow vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(255,255,255,0.25),inset_0_0_120px_rgba(255,200,120,0.1)]" />

          {/* Mini product cards — bottom-right, matching the reference */}
          {topRated.length > 0 && (
            <div className="absolute bottom-3 right-3 flex items-end gap-2 sm:bottom-5 sm:right-5 sm:gap-3 lg:bottom-6 lg:right-6 lg:gap-3.5">
              {topRated.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="animate-hero-fade-in group block w-17 overflow-hidden bg-white/95 shadow-md ring-1 ring-black/4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-25 lg:w-31.25"
                  style={{ animationDelay: `${350 + i * 80}ms` }}
                >
                  <div className="relative aspect-square bg-white p-1.5 sm:p-2">
                    <Image
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                      fill
                      sizes="(max-width: 640px) 68px, 125px"
                      className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-t border-gray-100/80 px-1.5 py-1 sm:px-2.5 sm:py-1.5">
                    <p className="truncate text-[7px] font-medium text-gray-700 sm:text-[10px] lg:text-[11px]">
                      {product.title}
                    </p>
                    <p className="mt-px text-[7px] font-semibold text-brand sm:text-[10px] lg:text-[11px]">
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
