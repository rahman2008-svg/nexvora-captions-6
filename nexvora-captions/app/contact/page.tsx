import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact options for NexVora Captions.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-ink dark:text-white">Contact</h1>
      <p className="mt-3 text-ink/70 dark:text-white/70">
        NexVora Captions doesn&apos;t use email support yet. Reach out through one of these:
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <a href="https://wa.me/8801707424006" target="_blank" rel="noopener noreferrer" className="rounded-card border border-ink/15 px-5 py-3 text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
          WhatsApp — 01707424006
        </a>
        <a href="https://wa.me/8801796951709" target="_blank" rel="noopener noreferrer" className="rounded-card border border-ink/15 px-5 py-3 text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
          WhatsApp — 01796951709
        </a>
        <a href="https://www.facebook.com/share/1BNn32qoJo/" target="_blank" rel="noopener noreferrer" className="rounded-card border border-ink/15 px-5 py-3 text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
          Facebook
        </a>
        <a href="https://www.instagram.com/ur___abdur____rahman__2008" target="_blank" rel="noopener noreferrer" className="rounded-card border border-ink/15 px-5 py-3 text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
          Instagram
        </a>
      </div>
    </div>
  );
}
