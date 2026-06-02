import { describe, it, expect } from 'vitest';
import { contactSchema } from './contact';

const valid = {
  fullName: 'Jane Doe',
  subject: 'Order question',
  email: 'jane@example.com',
  message: 'I have a question about my recent order, thanks.',
};

describe('contactSchema', () => {
  it('accepts a valid contact message', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a too-short name', () => {
    expect(contactSchema.safeParse({ ...valid, fullName: 'Jo' }).success).toBe(
      false
    );
  });

  it('rejects an invalid email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(
      false
    );
  });

  it('rejects a message shorter than 10 characters', () => {
    expect(
      contactSchema.safeParse({ ...valid, message: 'too short' }).success
    ).toBe(false);
  });
});
