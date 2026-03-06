'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingSchema, type ShippingFormData } from '@/types/checkout';
import { useCart } from '@/context/CartContext';
import { formatCurrency, cn } from '@/lib/utils';
import { INPUT_STYLES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/EmptyState';

// Checkout page 
// On submit, clears the cart and redirects to the success page.
export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    mode: 'onBlur',
  });

  function onSubmit(): void {
    clearCart();
    router.push('/checkout-success');
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
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
          className="lg:col-span-2"
        >
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
            <h2 className="font-heading text-heading text-gray-900">
              Shipping Information
            </h2>

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

          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full bg-brand text-white hover:bg-brand-hover lg:w-auto"
          >
            Place Order
          </Button>
        </form>

        <div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
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
