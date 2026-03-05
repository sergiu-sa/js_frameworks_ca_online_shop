import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | eCom Store',
  description: 'Get in touch with us. We would love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <h1 className="mb-8 font-heading text-display text-gray-900">
        Get in Touch
      </h1>
      <ContactForm />
    </div>
  );
}
