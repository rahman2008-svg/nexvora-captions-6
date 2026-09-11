import type { Metadata } from 'next';
import { CaptionCard } from '@/components/CaptionCard';
import { EmptyState } from '@/components/EmptyState';
import { ReshuffleLink } from '@/components/ReshuffleLink';
import { FilterPanel } from '@/components/FilterPanel';
import { filterCaptions, getAllMoods, getAllPlatforms, getCategories, getRandomCaption } from '@/lib/captions';
import type { CaptionFilters, Language, Length, Platform } from '@/types/caption';

export const metadata: Metadata = {
  title: 'Caption Generator',
  description: 'A dataset-based caption generator — picks a matching caption from the library. No AI required.',
};

type SearchParams = {
  category?: string;
  language?: string;
  mood?: string;
  length?: string;
  platform?: string;
  t?: string;
};

export default function GeneratorPage({ searchParams }: { searchParams: SearchParams }) {
  const filters: CaptionFilters = {
    category: searchParams.category || undefined,
    language: (searchParams.language as Language) || undefined,
    mood: searchParams.mood || undefined,
    length: (searchParams.length as Length) || undefined,
    platform: (searchParams.platform as Platform) || undefined,
  };
  const pool = filterCaptions(filters);
  const caption = getRandomCaption(pool);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="inline-block rounded-pill bg-clay-50 px-3 py-1 text-xs font-medium text-clay-600 dark:bg-clay-700/30 dark:text-clay-200">
        Dataset-based Caption Generator
      </p>
      <h1 className="mt-3 font-display text-3xl text-ink dark:text-white">Generator</h1>
      <p className="mt-2 max-w-prose text-ink/60 dark:text-white/60">
        This picks a matching caption from the NexVora library based on your filters. It does not
        use AI to write new text — every result already exists in the dataset.
      </p>

      <div className="mt-6">
        <FilterPanel
          action="/generator"
          categories={getCategories()}
          moods={getAllMoods()}
          platforms={getAllPlatforms()}
          current={searchParams}
        />
      </div>

      <div className="mt-8">
        {caption ? (
          <CaptionCard caption={caption} />
        ) : (
          <EmptyState title="No captions match that combination." description="Loosen a filter and try again." />
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <ReshuffleLink basePath="/generator" label="Generate Another" />
      </div>
    </div>
  );
}
