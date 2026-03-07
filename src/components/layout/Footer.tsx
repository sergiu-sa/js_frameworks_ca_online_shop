// Site footer 

import Link from 'next/link';
import { Mail, MapPin, Phone, Home, MessageSquare, ShoppingCart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200/60 bg-[#f5f2ed]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Link href="/" className="font-heading text-heading text-primary">
              eCom Store
            </Link>
            <p className="mt-3 text-body-sm text-gray-500">
              Your destination for great products at unbeatable prices.
            </p>
          </div>

          <div>
            <h3 className="text-body-sm font-semibold text-gray-900">
              Quick Links
            </h3>
            <nav aria-label="Footer" className="mt-3 flex flex-col gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 text-body-sm text-gray-500 transition-colors hover:text-brand"
              >
                <Home className="size-3.5" aria-hidden="true" />
                Home
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-body-sm text-gray-500 transition-colors hover:text-brand"
              >
                <MessageSquare className="size-3.5" aria-hidden="true" />
                Contact
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 text-body-sm text-gray-500 transition-colors hover:text-brand"
              >
                <ShoppingCart className="size-3.5" aria-hidden="true" />
                Cart
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-body-sm font-semibold text-gray-900">
              Contact
            </h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-gray-400" />
                <span className="text-body-sm text-gray-500">
                  support@ecomstore.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-gray-400" aria-hidden="true" />
                <span className="text-body-sm text-gray-500">
                  +47 123 45 678
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-gray-400" aria-hidden="true" />
                <span className="text-body-sm text-gray-500">
                  Oslo, Norway
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-caption text-gray-400">
            &copy; {new Date().getFullYear()} eCom Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
