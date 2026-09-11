import type { Metadata } from 'next';
import { CaptionGrid } from '@/components/CaptionGrid';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { Pagination } from '@/components/Pagination';
import { filterCaptions, getAllMoods, getAllPlatforms, getCategories } from '@/lib/captions';
import { paginate } from '@/lib/pagination';
import type { CaptionFilters, Language, Length, Platform } from '@/types/caption';

export const metadata: Metadata = {
  title: 'Browse Captions',
  description: 'Search and filter the full NexVora Captions library by category, language, mood, length, and platform.',
};

type SearchParams = {
  q?: string;
  category?: string;
  language?: string;
  mood?: string;
  length?: string;
  platform?: string;
  page?: string;
};

export default function CaptionsPage({ searchParams }: { searchParams: SearchParams }) {
  const filters: CaptionFilters = {
    query: searchParams.q,
    category: searchParams.category || undefined,
    language: (searchParams.language as Language) || undefined,
    mood: searchParams.mood || undefined,
    length: (searchParams.length as Length) || undefined,
    platform: (searchParams.platform as Platform) || undefined,
  };

  const results = filterCaptions(filters);
  const page = Number(searchParams.page) || 1;
  const { items, totalPages, totalItems } = paginate(results, page);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink dark:text-white">Browse captions</h1>
      <div className="mt-4">
        <SearchBar action="/captions" defaultValue={searchParams.q} />
      </div>

      <div className="mt-4">
        <FilterPanel
          action="/captions"
          categories={getCategories()}
          moods={getAllMoods()}
          platforms={getAllPlatforms()}
          current={searchParams}
        />
      </div>

      <p className="mt-6 text-sm text-ink/60 dark:text-white/60">
        {totalItems} {totalItems === 1 ? 'caption' : 'captions'} found
      </p>

      <div className="mt-4">
        <CaptionGrid captions={items} />
      </div>

      <div className="mt-8">
        <Pagination basePath="/captions" page={page} totalPages={totalPages} searchParams={searchParams} />
      </div>
    </div>
  );
}
