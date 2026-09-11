import type { Category } from '@/types/caption';

type Props = {
  action: string;
  categories?: Category[];
  moods: string[];
  platforms: string[];
  current: {
    q?: string;
    category?: string;
    language?: string;
    mood?: string;
    length?: string;
    platform?: string;
  };
  showCategoryFilter?: boolean;
};

const LENGTHS = ['short', 'medium', 'long'];
const LANGUAGES: Array<{ value: string; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'bn', label: 'Bengali' },
];

export function FilterPanel({
  action,
  categories = [],
  moods,
  platforms,
  current,
  showCategoryFilter = true,
}: Props) {
  const hasActiveFilters = Boolean(
    current.language || current.mood || current.length || current.platform || (showCategoryFilter && current.category)
  );

  return (
    <form
      action={action}
      method="GET"
      className="flex flex-wrap items-end gap-3 rounded-card border border-ink/10 bg-white p-4 dark:border-white/10 dark:bg-dusk-800"
      aria-label="Filter captions"
    >
      {current.q && <input type="hidden" name="q" value={current.q} />}

      {showCategoryFilter && (
        <Field label="Category">
          <select name="category" defaultValue={current.category ?? ''}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field label="Language">
        <select name="language" defaultValue={current.language ?? ''}>
          <option value="">All languages</option>
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Mood">
        <select name="mood" defaultValue={current.mood ?? ''}>
          <option value="">All moods</option>
          {moods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Length">
        <select name="length" defaultValue={current.length ?? ''}>
          <option value="">Any length</option>
          {LENGTHS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Platform">
        <select name="platform" defaultValue={current.platform ?? ''}>
          <option value="">All platforms</option>
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        className="rounded-pill bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/80 dark:bg-white dark:text-ink dark:hover:bg-white/80"
      >
        Apply filters
      </button>

      {hasActiveFilters && (
        <a
          href={action}
          className="rounded-pill border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 hover:border-clay-400 hover:text-clay-600 dark:border-white/15 dark:text-white/70"
        >
          Clear filters
        </a>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-ink/60 dark:text-white/60">
      {label}
      <span className="[&>select]:rounded-md [&>select]:border [&>select]:border-ink/15 [&>select]:bg-white [&>select]:px-2.5 [&>select]:py-1.5 [&>select]:text-sm [&>select]:text-ink dark:[&>select]:border-white/15 dark:[&>select]:bg-dusk-900 dark:[&>select]:text-white">
        {children}
      </span>
    </label>
  );
}
