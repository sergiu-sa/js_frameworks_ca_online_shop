// API client for the Noroff Online Shop API.
// Each function is wrapped in React's cache() so repeat calls within a single
// render (e.g. generateMetadata + the page body) share one request.

import { cache } from 'react';
import { API_BASE_URL } from './constants';
import { request } from './http';
import {
  productSchema,
  productsSchema,
  apiResponseSchema,
  type Product,
} from '@/types/product';

const productsResponseSchema = apiResponseSchema(productsSchema);
const productResponseSchema = apiResponseSchema(productSchema);

export const getAllProducts = cache(async (): Promise<Product[]> => {
  const { data } = await request(
    `${API_BASE_URL}/online-shop`,
    productsResponseSchema,
    { revalidate: 60 }
  );
  return data;
});

export const getProductById = cache(async (id: string): Promise<Product> => {
  const { data } = await request(
    `${API_BASE_URL}/online-shop/${id}`,
    productResponseSchema,
    { revalidate: 60 }
  );
  return data;
});
