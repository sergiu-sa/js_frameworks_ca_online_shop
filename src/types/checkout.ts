// Checkout form validation schema 

import { z } from 'zod';

export const checkoutSchema = z.object({
  // Shipping
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
  country: z.string().min(2, 'Please select a country'),

  // Payment
  cardNumber: z
    .string()
    .transform((val) => val.replace(/\s/g, ''))
    .pipe(
      z
        .string()
        .min(13, 'Card number must be at least 13 digits')
        .max(19, 'Card number must be at most 19 digits')
        .regex(/^\d+$/, 'Card number must contain only digits')
    ),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format'),
  cardCvc: z
    .string()
    .regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
  cardName: z.string().min(3, 'Cardholder name must be at least 3 characters'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export type ShippingFormData = CheckoutFormData;
