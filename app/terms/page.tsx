import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Basic usage terms for NexVora Captions.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-ink dark:text-white">Terms</h1>
      <div className="mt-6 space-y-5 text-ink/80 dark:text-white/80">
        <p>
          These terms are written in plain language and are not professional legal advice. By
          using NexVora Captions, you agree to the points below.
        </p>
        <h2 className="font-display text-lg text-ink dark:text-white">Using the captions</h2>
        <p>
          Captions in this library are free to copy and use in your own social media posts. They
          are provided as-is, without any guarantee of originality beyond our own review process.
        </p>
        <h2 className="font-display text-lg text-ink dark:text-white">No warranty</h2>
        <p>
          The site is provided as-is, without warranties of any kind. We aren&apos;t liable for
          how the content is used after you copy it.
        </p>
        <h2 className="font-display text-lg text-ink dark:text-white">Changes</h2>
        <p>These terms may be updated as the site evolves. Continued use means you accept the current version.</p>
        <h2 className="font-display text-lg text-ink dark:text-white">Contact</h2>
        <p>Questions about these terms can be sent through the contact page.</p>
      </div>
    </div>
  );
}
