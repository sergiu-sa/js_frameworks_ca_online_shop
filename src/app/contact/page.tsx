// Contact page

import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | eCom Store',
  description: 'Get in touch with us. We would love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h1 className="font-heading text-2xl text-gray-900 sm:text-display">
            Get in Touch
          </h1>
          <p className="mt-4 text-body text-gray-600">
            Have a question about a product, your order, or just want to say
            hello? We&apos;d love to hear from you. Fill out the form and
            we&apos;ll get back to you as soon as possible.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 text-brand" />
              <div>
                <p className="text-body-sm font-medium text-gray-900">Email</p>
                <p className="text-body-sm text-gray-500">support@ecomstore.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 text-brand" />
              <div>
                <p className="text-body-sm font-medium text-gray-900">Phone</p>
                <p className="text-body-sm text-gray-500">+47 123 45 678</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 text-brand" />
              <div>
                <p className="text-body-sm font-medium text-gray-900">Location</p>
                <p className="text-body-sm text-gray-500">Oslo, Norway</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white/70 p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
