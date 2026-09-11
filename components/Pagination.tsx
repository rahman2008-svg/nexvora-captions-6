type Props = {
  basePath: string;
  page: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
};

function buildHref(basePath: string, page: number, searchParams: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value && key !== 'page') params.set(key, value);
  });
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({ basePath, page, totalPages, searchParams }: Props) {
  if (totalPages <= 1) return null;

  const prevHref = page > 1 ? buildHref(basePath, page - 1, searchParams) : undefined;
  const nextHref = page < totalPages ? buildHref(basePath, page + 1, searchParams) : undefined;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-4 pt-4">
      {prevHref ? (
        <a href={prevHref} className="rounded-pill border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
          ← Previous
        </a>
      ) : (
        <span className="rounded-pill border border-ink/5 px-4 py-2 text-sm text-ink/30 dark:border-white/5 dark:text-white/30">← Previous</span>
      )}
      <span className="text-sm text-ink/60 dark:text-white/60">
        Page {page} of {totalPages}
      </span>
      {nextHref ? (
        <a href={nextHref} className="rounded-pill border border-ink/15 px-4 py-2 text-sm font-medium text-ink hover:border-moss-500 dark:border-white/15 dark:text-white">
          Next →
        </a>
      ) : (
        <span className="rounded-pill border border-ink/5 px-4 py-2 text-sm text-ink/30 dark:border-white/5 dark:text-white/30">Next →</span>
      )}
    </nav>
  );
}
