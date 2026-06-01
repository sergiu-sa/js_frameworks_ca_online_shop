import { describe, it, expect, vi, afterEach } from 'vitest';
import { z } from 'zod';
import { request, ApiError } from './http';

const schema = z.object({ value: z.number() });
const URL = 'https://example.com/data';

function mockFetch(impl: () => Promise<unknown>) {
  vi.stubGlobal('fetch', vi.fn(impl));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('request', () => {
  it('returns parsed data on a valid response', async () => {
    mockFetch(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ value: 42 }),
    }));
    await expect(request(URL, schema)).resolves.toEqual({ value: 42 });
  });

  it('throws an http ApiError with the status on a non-2xx response', async () => {
    mockFetch(async () => ({ ok: false, status: 404, json: async () => ({}) }));
    const error = await request(URL, schema).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.code).toBe('http');
    expect(error.status).toBe(404);
  });

  it('throws an invalid-response ApiError when the body is not JSON', async () => {
    mockFetch(async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError('Unexpected token');
      },
    }));
    const error = await request(URL, schema).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.code).toBe('invalid-response');
  });

  it('throws an invalid-response ApiError when the shape does not match', async () => {
    mockFetch(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ value: 'not a number' }),
    }));
    const error = await request(URL, schema).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.code).toBe('invalid-response');
  });

  it('throws a network ApiError when the fetch itself fails', async () => {
    mockFetch(async () => {
      throw new TypeError('Failed to fetch');
    });
    const error = await request(URL, schema).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.code).toBe('network');
  });

  it('throws a timeout ApiError when the request is aborted', async () => {
    mockFetch(async () => {
      throw new DOMException('The operation was aborted', 'AbortError');
    });
    const error = await request(URL, schema).catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.code).toBe('timeout');
  });
});
