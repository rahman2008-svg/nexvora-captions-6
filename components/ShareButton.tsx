'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function ShareButton({
  text,
  url,
  className,
}: {
  text: string;
  url?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'shared' | 'copied' | 'failed'>('idle');

  async function handleShare() {
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : undefined);
    try {
      if (navigator.share) {
        await navigator.share({ text, url: shareUrl });
        setStatus('shared');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl ? `${text}\n${shareUrl}` : text);
        setStatus('copied');
      } else {
        setStatus('failed');
      }
    } catch {
      // User cancelled the native share sheet — not an error worth surfacing.
      return;
    } finally {
      setTimeout(() => setStatus('idle'), 1800);
    }
  }

  const label =
    status === 'shared' ? 'Shared' : status === 'copied' ? 'Link copied' : status === 'failed' ? "Couldn't share" : 'Share';

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share caption"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-moss-500 hover:text-moss-600 dark:border-white/15 dark:text-white/90 dark:hover:border-moss-300 dark:hover:text-moss-200',
        className
      )}
    >
      {label}
    </button>
  );
}
