'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { contactSchema, type ContactFormData } from '@/types/contact';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const inputStyles =
  'w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 text-body text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  function onSubmit(data: ContactFormData): void {
    console.log(data);
    toast.success('Message sent successfully!');
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <label htmlFor="fullName" className="mb-1 block text-body-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Your full name"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          className={cn(inputStyles, errors.fullName && 'border-error focus:border-error focus:ring-error/20')}
          {...register('fullName')}
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-body-sm text-error">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1 block text-body-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="What is this about?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={cn(inputStyles, errors.subject && 'border-error focus:border-error focus:ring-error/20')}
          {...register('subject')}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-body-sm text-error">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-body-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={cn(inputStyles, errors.email && 'border-error focus:border-error focus:ring-error/20')}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-body-sm text-error">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-body-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Your message..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(inputStyles, 'min-h-[150px] resize-y', errors.message && 'border-error focus:border-error focus:ring-error/20')}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-body-sm text-error">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-brand text-white hover:bg-brand-hover"
      >
        Send Message
      </Button>
    </form>
  );
}
