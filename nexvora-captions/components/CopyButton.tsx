'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for browsers without the async clipboard API.
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setFailed(true);
      setTimeout(() => setFailed(false), 1800);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy caption"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-sm font-medium transition-colors',
        copied
          ? 'border-moss-500 bg-moss-500 text-white'
          : failed
          ? 'border-clay-500 bg-clay-50 text-clay-600 dark:bg-dusk-800'
          : 'border-ink/15 text-ink hover:border-moss-500 hover:text-moss-600 dark:border-white/15 dark:text-white/90 dark:hover:border-moss-300 dark:hover:text-moss-200',
        className
      )}
    >
      {copied ? 'Copied' : failed ? "Couldn't copy" : 'Copy'}
    </button>
  );
}
