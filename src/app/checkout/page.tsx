// Checkout page — shipping form + payment card form + order summary.
// On submit, clears the cart and redirects to the success page.

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, Lock, Truck, ShoppingBag } from 'lucide-react';
import { checkoutSchema, type CheckoutFormData } from '@/types/checkout';
import { useCart } from '@/context/CartContext';
import { formatCurrency, cn } from '@/lib/utils';
import { INPUT_STYLES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/EmptyState';

// Detect card brand from first digits
function getCardBrand(number: string): string {
  const n = number.replace(/\s/g, '');
  if (/^4/.test(n)) return 'Visa';
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n)) return 'Amex';
  if (/^6(?:011|5)/.test(n)) return 'Discover';
  return '';
}

// Format card number with spaces every 4 digits
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// Format expiry as MM/YY
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [cardDisplay, setCardDisplay] = useState('');
  const [expiryDisplay, setExpiryDisplay] = useState('');
  const [nameDisplay, setNameDisplay] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
  });

  function onSubmit(): void {
    clearCart();
    router.push('/checkout-success');
  }

  // Card number formatting handler
  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const formatted = formatCardNumber(e.target.value);
    setCardDisplay(formatted);
    setValue('cardNumber', formatted, { shouldValidate: false });
  }

  // Expiry formatting handler
  function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const formatted = formatExpiry(e.target.value);
    setExpiryDisplay(formatted);
    setValue('cardExpiry', formatted, { shouldValidate: false });
  }


  register('cardNumber');
  register('cardExpiry');

  const cardBrand = getCardBrand(cardDisplay);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to checkout"
          description="Your cart is empty. Add some products before checking out."
          action={
            <Button asChild className="bg-brand text-white hover:bg-brand-hover">
              <Link href="/">Browse Products</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl text-gray-900 sm:text-display">
        Checkout
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6 lg:col-span-2"
        >
          {/* ── Shipping Information ── */}
          <div className="rounded-2xl border border-gray-100 bg-white/70 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-heading text-gray-900">
                Shipping Information
              </h2>
              <Truck className="size-5 text-gray-400" aria-hidden="true" />
            </div>

            <div className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1 block text-body-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    aria-invalid={!!errors.fullName}
                    {...(errors.fullName && {
                      'aria-describedby': 'fullName-error',
                    })}
                    className={cn(
                      INPUT_STYLES,
                      errors.fullName &&
                        'border-error focus:border-error focus:ring-error/20'
                    )}
                    {...register('fullName')}
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      className="mt-1 text-body-sm text-error"
                    >
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-body-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    {...(errors.email && {
                      'aria-describedby': 'email-error',
                    })}
                    className={cn(
                      INPUT_STYLES,
                      errors.email &&
                        'border-error focus:border-error focus:ring-error/20'
                    )}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1 text-body-sm text-error"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-1 block text-body-sm font-medium text-gray-700"
                >
                  Street Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="123 Main Street"
                  aria-invalid={!!errors.address}
                  {...(errors.address && {
                    'aria-describedby': 'address-error',
                  })}
                  className={cn(
                    INPUT_STYLES,
                    errors.address &&
                      'border-error focus:border-error focus:ring-error/20'
                  )}
                  {...register('address')}
                />
                {errors.address && (
                  <p
                    id="address-error"
                    className="mt-1 text-body-sm text-error"
                  >
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1 block text-body-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="Oslo"
                    aria-invalid={!!errors.city}
                    {...(errors.city && {
                      'aria-describedby': 'city-error',
                    })}
                    className={cn(
                      INPUT_STYLES,
                      errors.city &&
                        'border-error focus:border-error focus:ring-error/20'
                    )}
                    {...register('city')}
                  />
                  {errors.city && (
                    <p
                      id="city-error"
                      className="mt-1 text-body-sm text-error"
                    >
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-1 block text-body-sm font-medium text-gray-700"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    placeholder="0150"
                    aria-invalid={!!errors.postalCode}
                    {...(errors.postalCode && {
                      'aria-describedby': 'postalCode-error',
                    })}
                    className={cn(
                      INPUT_STYLES,
                      errors.postalCode &&
                        'border-error focus:border-error focus:ring-error/20'
                    )}
                    {...register('postalCode')}
                  />
                  {errors.postalCode && (
                    <p
                      id="postalCode-error"
                      className="mt-1 text-body-sm text-error"
                    >
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="mb-1 block text-body-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    aria-invalid={!!errors.country}
                    {...(errors.country && {
                      'aria-describedby': 'country-error',
                    })}
                    className={cn(
                      INPUT_STYLES,
                      'appearance-none',
                      errors.country &&
                        'border-error focus:border-error focus:ring-error/20'
                    )}
                    defaultValue=""
                    {...register('country')}
                  >
                    <option value="" disabled>
                      Select country
                    </option>
                    <option value="Norway">Norway</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Finland">Finland</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="United States">United States</option>
                  </select>
                  {errors.country && (
                    <p
                      id="country-error"
                      className="mt-1 text-body-sm text-error"
                    >
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="rounded-2xl border border-gray-100 bg-white/70 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-heading text-gray-900">
                Payment
              </h2>
              <div className="flex items-center gap-1.5 text-caption text-gray-400">
                <Lock className="size-3.5" />
                <span>Secure checkout</span>
              </div>
            </div>

            {/* Mini card preview  */}
            <div className="mx-auto mt-4 w-full max-w-85">
              <div className="aspect-[1.586/1] rounded-xl bg-linear-to-br from-gray-800 to-gray-950 p-4 text-white shadow-lg sm:p-5">
                <div className="flex items-center justify-between">
                  <CreditCard className="size-6 text-gray-400" />
                  <span className="text-caption font-semibold tracking-wide text-gray-300">
                    {cardBrand || 'Credit Card'}
                  </span>
                </div>
                <p className="mt-4 font-mono text-body-sm tracking-[0.15em] sm:text-body sm:tracking-[0.2em]">
                  {cardDisplay || '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022'}
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400">Cardholder</p>
                    <p className="mt-0.5 truncate text-caption font-medium">
                      {nameDisplay || 'Your Name'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-gray-400">Expires</p>
                    <p className="mt-0.5 text-caption font-medium">
                      {expiryDisplay || 'MM/YY'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label
                  htmlFor="cardName"
                  className="mb-1 block text-body-sm font-medium text-gray-700"
                >
                  Cardholder Name
                </label>
                <input
                  id="cardName"
                  type="text"
                  placeholder="Name on card"
                  aria-invalid={!!errors.cardName}
                  {...(errors.cardName && {
                    'aria-describedby': 'cardName-error',
                  })}
                  className={cn(
                    INPUT_STYLES,
                    errors.cardName &&
                      'border-error focus:border-error focus:ring-error/20'
                  )}
                  {...register('cardName', {
                    onChange: (e) => setNameDisplay(e.target.value),
                  })}
                />
                {errors.cardName && (
                  <p
                    id="cardName-error"
                    className="mt-1 text-body-sm text-error"
                  >
                    {errors.cardName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="mb-1 block text-body-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardDisplay}
                    onChange={handleCardNumberChange}
                    onBlur={() => setValue('cardNumber', cardDisplay, { shouldValidate: true })}
                    aria-invalid={!!errors.cardNumber}
                    {...(errors.cardNumber && {
                      'aria-describedby': 'cardNumber-error',
                    })}
                    className={cn(
                      INPUT_STYLES,
                      'pr-12',
                      errors.cardNumber &&
                        'border-error focus:border-error focus:ring-error/20'
                    )}
                  />
                  {cardBrand && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-caption font-semibold text-gray-400">
                      {cardBrand}
                    </span>
                  )}
                </div>
                {errors.cardNumber && (
                  <p
                    id="cardNumber-error"
                    className="mt-1 text-body-sm text-error"
                  >
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="cardExpiry"
                    className="mb-1 block text-body-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    id="cardExpiry"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiryDisplay}
                    onChange={handleExpiryChange}
                    onBlur={() => setValue('cardExpiry', expiryDisplay, { shouldValidate: true })}
                    aria-invalid={!!errors.cardExpiry}
                    {...(errors.cardExpiry && {
                      'aria-describedby': 'cardExpiry-error',
                    })}
                    className={cn(
                      INPUT_STYLES,
                      errors.cardExpiry &&
                        'border-error focus:border-error focus:ring-error/20'
                    )}
                  />
                  {errors.cardExpiry && (
                    <p
                      id="cardExpiry-error"
                      className="mt-1 text-body-sm text-error"
                    >
                      {errors.cardExpiry.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cardCvc"
                    className="mb-1 block text-body-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <input
                    id="cardCvc"
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="123"
                    aria-invalid={!!errors.cardCvc}
                    {...(errors.cardCvc && {
                      'aria-describedby': 'cardCvc-error',
                    })}
                    className={cn(
                      INPUT_STYLES,
                      errors.cardCvc &&
                        'border-error focus:border-error focus:ring-error/20'
                    )}
                    {...register('cardCvc')}
                  />
                  {errors.cardCvc && (
                    <p
                      id="cardCvc-error"
                      className="mt-1 text-body-sm text-error"
                    >
                      {errors.cardCvc.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-brand text-white hover:bg-brand-hover"
          >
            <Lock className="mr-2 size-4" />
            Pay {formatCurrency(totalPrice)}
          </Button>
        </form>

        {/* Order Summary */}
        <div>
          <div className="rounded-2xl border border-gray-100 bg-white/70 p-6 lg:sticky lg:top-24">
            <h2 className="font-heading text-heading text-gray-900">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="line-clamp-1 text-body-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-caption text-gray-500">
                      Qty: {item.quantity} &times;{' '}
                      {formatCurrency(item.discountedPrice)}
                    </p>
                  </div>
                  <span className="shrink-0 self-center text-body-sm font-semibold text-gray-900">
                    {formatCurrency(item.discountedPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-body-sm text-gray-600">
                <span>Items ({totalItems})</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-body-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-body font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
