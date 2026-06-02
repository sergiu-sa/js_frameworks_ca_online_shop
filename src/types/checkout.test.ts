import { describe, it, expect } from 'vitest';
import { checkoutSchema } from './checkout';

const valid = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  address: '123 Main Street',
  city: 'Oslo',
  postalCode: '0150',
  country: 'Norway',
  cardNumber: '4242 4242 4242 4242',
  cardExpiry: '04/27',
  cardCvc: '123',
  cardName: 'Jane Doe',
};

describe('checkoutSchema', () => {
  it('accepts a fully valid checkout form', () => {
    const result = checkoutSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('strips spaces from the card number', () => {
    const result = checkoutSchema.parse(valid);
    expect(result.cardNumber).toBe('4242424242424242');
  });

  it('rejects an invalid email', () => {
    const result = checkoutSchema.safeParse({
      ...valid,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a card number that is too short', () => {
    const result = checkoutSchema.safeParse({ ...valid, cardNumber: '4242' });
    expect(result.success).toBe(false);
  });

  it('rejects a badly formatted expiry', () => {
    const result = checkoutSchema.safeParse({ ...valid, cardExpiry: '13/99' });
    expect(result.success).toBe(false);
  });

  it('rejects a CVC that is not 3-4 digits', () => {
    const result = checkoutSchema.safeParse({ ...valid, cardCvc: '12' });
    expect(result.success).toBe(false);
  });
});
