// --- Product data model ---
// Schemas double as runtime validation for API responses; the TypeScript
// types are inferred from them so the two can never drift apart.

import { z } from 'zod';

export const productImageSchema = z.object({
  url: z.string(),
  alt: z.string(),
});

export const reviewSchema = z.object({
  id: z.string(),
  username: z.string(),
  rating: z.number(),
  description: z.string(),
});

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountedPrice: z.number(),
  image: productImageSchema,
  rating: z.number(),
  tags: z.array(z.string()),
  reviews: z.array(reviewSchema),
});

export const productsSchema = z.array(productSchema);

export type ProductImage = z.infer<typeof productImageSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type Product = z.infer<typeof productSchema>;

// Wraps a data schema in the Noroff API's `{ data, meta }` envelope.
export function apiResponseSchema<T extends z.ZodTypeAny>(data: T) {
  return z.object({ data });
}
