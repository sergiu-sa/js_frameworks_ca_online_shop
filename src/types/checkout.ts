/**
 * Shipping form validation schema and inferred TypeScript type.
 */

import { z } from 'zod';

export const shippingSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
  country: z.string().min(2, 'Please select a country'),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
