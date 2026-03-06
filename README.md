# eCom Store

A fully functional e-commerce application built with Next.js 16, TypeScript, and Tailwind CSS. Browse products, search, add to cart, and complete checkout; all with a responsive, accessible UI.

## Live Demo

[Deployed Link - eCom Website](https://js-frameworks-ca-online-shop.vercel.app/)

## Features

- Product listing with responsive grid layout
- Product detail pages with images, pricing, reviews, and tags
- Real-time search filtering
- Shopping cart with quantity controls and persistent state
- Checkout flow with order confirmation
- Contact form with client-side validation
- Fully responsive across mobile, tablet, and desktop
- Accessible UI with ARIA labels and keyboard support

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Notifications:** Sonner toast
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

## API

Product data is fetched from the [Noroff Online Shop API](https://v2.api.noroff.dev/online-shop).

## Project Structure

```bash
src/
├── app/                  # Next.js App Router pages
│   ├── cart/             # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── checkout-success/ # Order confirmation page
│   ├── contact/          # Contact form page
│   └── product/[id]/     # Product detail page
├── components/
│   ├── cart/             # Cart components
│   ├── contact/          # Contact form component
│   ├── layout/           # Header and Footer
│   ├── product/          # Product cards, detail view, ratings, pricing
│   ├── search/           # Search bar, results dropdown, homepage client
│   └── ui/               # Reusable UI primitives (Button, Skeleton, Tag, EmptyState)
├── context/              # Cart state management (React Context + useReducer)
├── hooks/                # Custom hooks (useDebounce, useSearch)
├── lib/                  # API service, utilities, constants
└── types/                # TypeScript type definitions
```
