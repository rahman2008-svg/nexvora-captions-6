import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { href: '/captions', label: 'Categories' },
  { href: '/random', label: 'Random' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/generator', label: 'Generator' },
  { href: '/about', label: 'About' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-white/10 dark:bg-dusk-900/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg text-ink dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-moss-600 text-sm font-semibold text-white">
            NV
          </span>
          NexVora Captions
        </Link>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/70 transition-colors hover:text-moss-600 dark:text-white/70 dark:hover:text-moss-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/captions"
            aria-label="Search captions"
            className="text-sm text-ink/70 transition-colors hover:text-moss-600 dark:text-white/70 dark:hover:text-moss-300"
          >
            Search
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
