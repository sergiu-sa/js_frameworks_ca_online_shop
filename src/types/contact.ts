import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
