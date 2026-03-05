import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-body-sm text-gray-500">
            &copy; {new Date().getFullYear()} eCom Store. All rights reserved.
          </p>
          <nav aria-label="Footer" className="flex gap-6">
            <Link
              href="/"
              className="text-body-sm text-gray-500 transition-colors hover:text-brand"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="text-body-sm text-gray-500 transition-colors hover:text-brand"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
