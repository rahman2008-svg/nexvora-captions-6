import type { Metadata } from 'next';
import { TOTAL_CAPTION_COUNT } from '@/lib/captions';

export const metadata: Metadata = {
  title: 'About',
  description: 'About NexVora Captions, the developer behind it, and NexVora Lab\'s Ofc.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-ink dark:text-white">About NexVora Captions</h1>
      <p className="mt-3 text-ink/70 dark:text-white/70">
        NexVora Captions is a caption library and dataset-based generator with {TOTAL_CAPTION_COUNT}+
        captions across dozens of categories, built to keep growing toward 10,000 and beyond.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl text-ink dark:text-white">About Developer</h2>
        <p className="mt-2 font-medium text-ink dark:text-white">Prince AR Abdur Rahman</p>
        <p className="mt-2 text-ink/70 dark:text-white/70">
          Independent App Developer passionate about building modern Android applications,
          productivity tools, AI-powered experiences, media players, educational apps, and
          next-generation digital products.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a href="https://wa.me/8801707424006" target="_blank" rel="noopener noreferrer" className="rounded-pill border border-ink/15 px-4 py-2 text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
            WhatsApp: 01707424006
          </a>
          <a href="https://wa.me/8801796951709" target="_blank" rel="noopener noreferrer" className="rounded-pill border border-ink/15 px-4 py-2 text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
            WhatsApp: 01796951709
          </a>
          <a href="https://www.facebook.com/share/1BNn32qoJo/" target="_blank" rel="noopener noreferrer" className="rounded-pill border border-ink/15 px-4 py-2 text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
            Facebook
          </a>
          <a href="https://www.instagram.com/ur___abdur____rahman__2008" target="_blank" rel="noopener noreferrer" className="rounded-pill border border-ink/15 px-4 py-2 text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
            Instagram
          </a>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-ink dark:text-white">About Company</h2>
        <p className="mt-2 font-medium text-ink dark:text-white">NexVora Lab&apos;s Ofc</p>
        <p className="mt-2 text-ink/70 dark:text-white/70">
          NexVora Lab&apos;s Ofc focuses on creating innovative Android applications designed to
          improve productivity, entertainment, learning, and digital experiences.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-ink dark:text-white">Mission</h2>
        <p className="mt-2 text-ink/70 dark:text-white/70">
          Build fast, beautiful, privacy-friendly, and user-focused applications accessible to
          everyone.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-ink dark:text-white">Technical Information</h2>
        <p className="mt-2 text-ink/70 dark:text-white/70">Version: 1.0.0</p>
      </section>

      <section className="mt-10 border-t border-ink/10 pt-6 text-sm text-ink/60 dark:border-white/10 dark:text-white/60">
        <p>Developed by Prince AR Abdur Rahman</p>
        <p>Published by NexVora Lab&apos;s Ofc</p>
        <p>© 2026 NexVora Lab&apos;s Ofc. All Rights Reserved.</p>
      </section>
    </div>
  );
}
