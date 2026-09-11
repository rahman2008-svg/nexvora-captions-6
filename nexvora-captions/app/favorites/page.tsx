'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { getAllCaptions } from '@/lib/captions';
import { CaptionGrid } from '@/components/CaptionGrid';
import { LoadingState } from '@/components/LoadingState';
import { EmptyState } from '@/components/EmptyState';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favoriteIds, hydrated } = useFavorites();
  const all = getAllCaptions();
  const favorites = all.filter((c) => favoriteIds.includes(c.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink dark:text-white">Favorites</h1>
      <p className="mt-2 text-ink/60 dark:text-white/60">
        Saved captions live only on this device. Clearing your browser storage will remove them.
      </p>

      <div className="mt-6">
        {!hydrated ? (
          <LoadingState count={3} />
        ) : favorites.length > 0 ? (
          <CaptionGrid captions={favorites} />
        ) : (
          <EmptyState
            title="No favorites yet."
            description="Save captions you like and they'll show up here."
            action={
              <Link href="/captions" className="rounded-pill bg-moss-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-moss-700">
                Browse captions
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
