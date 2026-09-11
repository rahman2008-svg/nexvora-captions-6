import type { Metadata } from 'next';
import { CaptionCard } from '@/components/CaptionCard';
import { EmptyState } from '@/components/EmptyState';
import { ReshuffleLink } from '@/components/ReshuffleLink';
import { filterCaptions, getCategories, getRandomCaption } from '@/lib/captions';
import type { CaptionFilters, Language } from '@/types/caption';

export const metadata: Metadata = {
  title: 'Random Caption',
  description: 'Get a random caption from the NexVora Captions library, or narrow it to a category or language first.',
};

type SearchParams = { category?: string; language?: string; t?: string };

export default function RandomPage({ searchParams }: { searchParams: SearchParams }) {
  const filters: CaptionFilters = {
    category: searchParams.category || undefined,
    language: (searchParams.language as Language) || undefined,
  };
  const pool = filterCaptions(filters);
  const caption = getRandomCaption(pool);
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl text-ink dark:text-white">Random Caption</h1>
      <p className="mt-2 text-ink/60 dark:text-white/60">
        Pull a random caption from the library, or narrow it down first.
      </p>

      <form action="/random" method="GET" className="mt-6 flex flex-wrap items-end gap-3 rounded-card border border-ink/10 bg-white p-4 dark:border-white/10 dark:bg-dusk-800">
        <label className="flex flex-col gap-1 text-xs font-medium text-ink/60 dark:text-white/60">
          Category
          <select name="category" defaultValue={searchParams.category ?? ''} className="rounded-md border border-ink/15 bg-white px-2.5 py-1.5 text-sm text-ink dark:border-white/15 dark:bg-dusk-900 dark:text-white">
            <option value="">Random category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-ink/60 dark:text-white/60">
          Language
          <select name="language" defaultValue={searchParams.language ?? ''} className="rounded-md border border-ink/15 bg-white px-2.5 py-1.5 text-sm text-ink dark:border-white/15 dark:bg-dusk-900 dark:text-white">
            <option value="">Random language</option>
            <option value="en">English</option>
            <option value="bn">Bengali</option>
          </select>
        </label>
        <button type="submit" className="rounded-pill bg-ink px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-ink">
          Random Caption
        </button>
      </form>

      <div className="mt-8">
        {caption ? (
          <CaptionCard caption={caption} />
        ) : (
          <EmptyState title="No captions match that combination." description="Try a different category or language." />
        )}
      </div>

      <div className="mt-6">
        <ReshuffleLink basePath="/random" label="Another Caption" />
      </div>
    </div>
  );
}
