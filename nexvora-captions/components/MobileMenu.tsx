'use client';

import { useState } from 'react';
import Link from 'next/link';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/captions', label: 'Categories' },
  { href: '/random', label: 'Random' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/generator', label: 'Generator' },
  { href: '/about', label: 'About' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink dark:border-white/15 dark:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-ink/40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col gap-1 bg-paper p-6 dark:bg-dusk-900">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-lg text-ink dark:text-white">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink dark:border-white/15 dark:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
