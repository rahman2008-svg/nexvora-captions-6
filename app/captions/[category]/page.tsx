import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CaptionGrid } from '@/components/CaptionGrid';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { Pagination } from '@/components/Pagination';
import {
  filterCaptions,
  getAllMoods,
  getAllPlatforms,
  getCategories,
  getCategory,
  getCategoryCount,
} from '@/lib/captions';
import { paginate } from '@/lib/pagination';
import type { CaptionFilters, Language, Length, Platform } from '@/types/caption';

type Params = { category: string };
type SearchParams = {
  q?: string;
  language?: string;
  mood?: string;
  length?: string;
  platform?: string;
  page?: string;
};

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  const count = getCategoryCount(category.slug);
  return {
    title: `${category.name} Captions`,
    description: `${count} ${category.name.toLowerCase()} captions — ${category.description}`,
    alternates: { canonical: `/captions/${category.slug}` },
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const filters: CaptionFilters = {
    query: searchParams.q,
    category: category.slug,
    language: (searchParams.language as Language) || undefined,
    mood: searchParams.mood || undefined,
    length: (searchParams.length as Length) || undefined,
    platform: (searchParams.platform as Platform) || undefined,
  };

  const results = filterCaptions(filters);
  const page = Number(searchParams.page) || 1;
  const { items, totalPages, totalItems } = paginate(results, page);

  const related = (category.relatedSlugs ?? [])
    .map((slug) => getCategory(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink dark:text-white">{category.name} Captions</h1>
      <p className="mt-2 text-ink/60 dark:text-white/60">{category.description}</p>
      <p className="mt-1 text-sm text-ink/50 dark:text-white/50">{getCategoryCount(category.slug)} captions in this category</p>

      <div className="mt-6">
        <SearchBar action={`/captions/${category.slug}`} defaultValue={searchParams.q} />
      </div>

      <div className="mt-4">
        <FilterPanel
          action={`/captions/${category.slug}`}
          moods={getAllMoods()}
          platforms={getAllPlatforms()}
          current={searchParams}
          showCategoryFilter={false}
        />
      </div>

      <p className="mt-6 text-sm text-ink/60 dark:text-white/60">
        {totalItems} {totalItems === 1 ? 'caption' : 'captions'} found
      </p>

      <div className="mt-4">
        <CaptionGrid captions={items} />
      </div>

      <div className="mt-8">
        <Pagination basePath={`/captions/${category.slug}`} page={page} totalPages={totalPages} searchParams={searchParams} />
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-xl text-ink dark:text-white">Related categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/captions/${r.slug}`}
                className="rounded-pill border border-ink/15 px-4 py-2 text-sm text-ink hover:border-moss-500 dark:border-white/15 dark:text-white"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
