// Root layout that wraps every page with fonts, cart provider, header/footer shell, and toast notifications.

import type { Metadata } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'eCom Store | Browse Products',
  description:
    'Browse and shop the latest products with great deals and discounts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
