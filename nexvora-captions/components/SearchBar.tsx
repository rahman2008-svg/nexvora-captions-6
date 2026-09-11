type Props = {
  action: string;
  defaultValue?: string;
  hidden?: Record<string, string | undefined>;
  placeholder?: string;
};

export function SearchBar({ action, defaultValue = '', hidden = {}, placeholder }: Props) {
  return (
    <form action={action} method="GET" role="search" className="flex w-full max-w-2xl gap-2">
      {Object.entries(hidden).map(([key, value]) =>
        value ? <input key={key} type="hidden" name={key} value={value} /> : null
      )}
      <label htmlFor="q" className="sr-only">
        Search captions
      </label>
      <input
        id="q"
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder ?? 'Search 10,000+ captions...'}
        className="w-full rounded-pill border border-ink/15 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-200 dark:border-white/15 dark:bg-dusk-800 dark:text-white dark:placeholder:text-white/40"
      />
      <button
        type="submit"
        className="shrink-0 rounded-pill bg-moss-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-moss-700"
      >
        Search
      </button>
    </form>
  );
}
