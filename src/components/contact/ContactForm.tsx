// ContactForm — Zod-validated form 
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Send } from 'lucide-react';
import { contactSchema, type ContactFormData } from '@/types/contact';
import { cn } from '@/lib/utils';
import { INPUT_STYLES } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  function onSubmit(): void {
    setSubmitted(true);
    reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="size-12 text-success" />
        <h3 className="font-heading text-heading-sm text-gray-900">
          Message Sent!
        </h3>
        <p className="text-body-sm text-gray-500">
          Thank you for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="mt-2"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <label
          htmlFor="fullName"
          className="mb-1 block text-body-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Your full name"
          aria-invalid={!!errors.fullName}
          {...(errors.fullName && { 'aria-describedby': 'fullName-error' })}
          className={cn(
            INPUT_STYLES,
            errors.fullName &&
              'border-error focus:border-error focus:ring-error/20'
          )}
          {...register('fullName')}
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-body-sm text-error">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-1 block text-body-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="What is this about?"
          aria-invalid={!!errors.subject}
          {...(errors.subject && { 'aria-describedby': 'subject-error' })}
          className={cn(
            INPUT_STYLES,
            errors.subject &&
              'border-error focus:border-error focus:ring-error/20'
          )}
          {...register('subject')}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-body-sm text-error">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-body-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          {...(errors.email && { 'aria-describedby': 'email-error' })}
          className={cn(
            INPUT_STYLES,
            errors.email &&
              'border-error focus:border-error focus:ring-error/20'
          )}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-body-sm text-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-body-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Your message..."
          aria-invalid={!!errors.message}
          {...(errors.message && { 'aria-describedby': 'message-error' })}
          className={cn(
            INPUT_STYLES,
            'min-h-37.5 resize-y',
            errors.message &&
              'border-error focus:border-error focus:ring-error/20'
          )}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-body-sm text-error">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-brand text-white hover:bg-brand-hover"
      >
        <Send className="mr-2 size-4" aria-hidden="true" />
        Send Message
      </Button>
    </form>
  );
}
