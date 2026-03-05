import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Shopping Cart | eCom Store',
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return children;
}
