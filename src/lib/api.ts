import { API_BASE_URL } from './constants';
import type { Product, ApiResponse } from '@/types/product';

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/online-shop`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const json: ApiResponse<Product[]> = await response.json();
  return json.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/online-shop/${id}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`);
  }

  const json: ApiResponse<Product> = await response.json();
  return json.data;
}
