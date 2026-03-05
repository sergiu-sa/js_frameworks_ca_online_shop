import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Order Confirmed | eCom Store',
  robots: { index: false },
};

export default function CheckoutSuccessLayout({ children }: { children: ReactNode }) {
  return children;
}
