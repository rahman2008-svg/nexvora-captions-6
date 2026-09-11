import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How NexVora Captions handles data, including local favorites storage.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-ink dark:text-white">Privacy Policy</h1>
      <div className="mt-6 space-y-5 text-ink/80 dark:text-white/80">
        <p>
          NexVora Captions is designed to work without requiring an account. This page explains
          what data the site stores and why.
        </p>
        <h2 className="font-display text-lg text-ink dark:text-white">Local favorites</h2>
        <p>
          When you save a caption, its ID is stored in your browser&apos;s local storage, on your
          own device. We don&apos;t receive or store this list on a server, and it isn&apos;t tied
          to an account. Clearing your browser data or switching devices will remove it.
        </p>
        <h2 className="font-display text-lg text-ink dark:text-white">Theme preference</h2>
        <p>Your light/dark mode choice is stored the same way — locally, in your browser.</p>
        <h2 className="font-display text-lg text-ink dark:text-white">What we don&apos;t collect</h2>
        <p>
          Version 1 of NexVora Captions does not require sign-up, does not collect personal
          information, and does not use tracking cookies.
        </p>
        <h2 className="font-display text-lg text-ink dark:text-white">Third-party services</h2>
        <p>
          The site may be hosted on a third-party platform (such as Vercel), which can process
          standard server logs (like IP address and request time) as part of normal hosting
          operation. If analytics are added in a future version, this page will be updated first.
        </p>
        <h2 className="font-display text-lg text-ink dark:text-white">Contact</h2>
        <p>Questions about this policy can be sent through the contact page.</p>
      </div>
    </div>
  );
}
