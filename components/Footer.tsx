import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white dark:border-white/10 dark:bg-dusk-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-lg text-ink dark:text-white">NexVora Captions</p>
            <p className="mt-2 text-sm text-ink/60 dark:text-white/60">
              A caption library for every mood, moment, and platform.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-white/40">Quick links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/" className="text-ink/70 hover:text-moss-600 dark:text-white/70">Home</Link></li>
              <li><Link href="/captions" className="text-ink/70 hover:text-moss-600 dark:text-white/70">Categories</Link></li>
              <li><Link href="/random" className="text-ink/70 hover:text-moss-600 dark:text-white/70">Random</Link></li>
              <li><Link href="/favorites" className="text-ink/70 hover:text-moss-600 dark:text-white/70">Favorites</Link></li>
              <li><Link href="/generator" className="text-ink/70 hover:text-moss-600 dark:text-white/70">Generator</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-white/40">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="text-ink/70 hover:text-moss-600 dark:text-white/70">About</Link></li>
              <li><Link href="/contact" className="text-ink/70 hover:text-moss-600 dark:text-white/70">Contact</Link></li>
              <li><Link href="/privacy" className="text-ink/70 hover:text-moss-600 dark:text-white/70">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-ink/70 hover:text-moss-600 dark:text-white/70">Terms</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-white/40">Connect</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://www.facebook.com/share/1BNn32qoJo/" target="_blank" rel="noopener noreferrer" className="text-ink/70 hover:text-moss-600 dark:text-white/70">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/ur___abdur____rahman__2008" target="_blank" rel="noopener noreferrer" className="text-ink/70 hover:text-moss-600 dark:text-white/70">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801707424006" target="_blank" rel="noopener noreferrer" className="text-ink/70 hover:text-moss-600 dark:text-white/70">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink/50 dark:border-white/10 dark:text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Developed by Prince AR Abdur Rahman · Published by NexVora Lab&apos;s Ofc</p>
          <p>Version 1.0.0 · © 2026 NexVora Lab&apos;s Ofc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
