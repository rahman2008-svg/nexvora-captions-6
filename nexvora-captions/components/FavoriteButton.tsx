'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/cn';

export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites();
  const saved = hydrated && isFavorite(id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(id)}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-sm font-medium transition-colors',
        saved
          ? 'border-clay-500 bg-clay-500 text-white'
          : 'border-ink/15 text-ink hover:border-clay-400 hover:text-clay-600 dark:border-white/15 dark:text-white/90 dark:hover:border-clay-300 dark:hover:text-clay-200',
        className
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20.8 4.6c-1.9-1.9-5-1.9-6.9 0L12 5.5l-1.9-1.9c-1.9-1.9-5-1.9-6.9 0-1.9 1.9-1.9 5 0 6.9L12 19l8.8-8.5c1.9-1.9 1.9-5 0-6.9Z" />
      </svg>
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}
