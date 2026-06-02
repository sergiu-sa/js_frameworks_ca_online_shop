/**
 * Shared request helper for the app's API calls.
 * Centralises timeout handling, HTTP error checking, and response validation so
 * individual API functions stay tiny and every failure has a typed, recoverable shape.
 */

import type { z } from 'zod';

const DEFAULT_TIMEOUT_MS = 8000;

export type ApiErrorCode = 'network' | 'timeout' | 'http' | 'invalid-response';

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;

  constructor(code: ApiErrorCode, message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

interface RequestOptions {
  /** Next.js cache revalidation window, in seconds. */
  revalidate?: number;
  timeoutMs?: number;
}

/**
 * Fetches `url`, validates the JSON body against `schema`, and returns the parsed value.
 * Throws an ApiError on timeout, network failure, non-2xx status, or unexpected shape.
 */
export async function request<T>(
  url: string,
  schema: z.ZodType<T>,
  { revalidate, timeoutMs = DEFAULT_TIMEOUT_MS }: RequestOptions = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(url, {
      signal: controller.signal,
      ...(revalidate !== undefined && { next: { revalidate } }),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('timeout', `Request to ${url} timed out`);
    }
    throw new ApiError('network', `Network request to ${url} failed`);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new ApiError(
      'http',
      `Request to ${url} failed with status ${response.status}`,
      response.status
    );
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new ApiError(
      'invalid-response',
      `Response from ${url} was not valid JSON`
    );
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    throw new ApiError(
      'invalid-response',
      `Response from ${url} did not match the expected shape`
    );
  }

  return result.data;
}
