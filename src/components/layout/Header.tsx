// Site header — sticky nav bar with logo, desktop nav links, cart button and a mobile hamburger menu.

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, Home, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/contact', label: 'Contact', icon: MessageSquare },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-heading text-primary">
          eCom Store
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 text-body-sm font-medium transition-colors hover:text-brand',
                  pathname === link.href
                    ? 'font-semibold text-brand'
                    : 'text-gray-600'
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <span
                key={totalItems}
                className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-brand text-caption font-bold text-white animate-badge-pop"
              >
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
            <span className="sr-only">
              Cart{totalItems > 0 ? `, ${totalItems} item${totalItems !== 1 ? 's' : ''}` : ''}
            </span>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Site navigation links</SheetDescription>
              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-4 px-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 text-lg font-medium transition-colors hover:text-brand',
                        pathname === link.href
                          ? 'text-brand'
                          : 'text-foreground'
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                      {link.label}
                    </Link>
                  );
                })}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className={cn(
                    'flex items-center gap-3 text-left text-lg font-medium transition-colors hover:text-brand',
                    pathname === '/cart' ? 'text-brand' : 'text-foreground'
                  )}
                >
                  <ShoppingCart className="size-5" aria-hidden="true" />
                  Cart
                </button>
              </nav>
            </SheetContent>
          </Sheet>

          <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
        </div>
      </div>
    </header>
  );
}
