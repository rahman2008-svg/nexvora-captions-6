import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <p className="font-display text-5xl text-ink dark:text-white">404</p>
      <h1 className="font-display text-2xl text-ink dark:text-white">This page doesn&apos;t exist.</h1>
      <p className="text-ink/60 dark:text-white/60">
        The caption, category, or page you&apos;re looking for isn&apos;t here. It may have been
        moved or the link might be off.
      </p>
      <Link href="/" className="mt-2 rounded-pill bg-moss-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-moss-700">
        Back to home
      </Link>
    </div>
  );
}
