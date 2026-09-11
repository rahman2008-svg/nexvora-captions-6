export function LoadingState({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading captions">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-card border border-ink/10 bg-ink/5 dark:border-white/10 dark:bg-white/5"
        />
      ))}
    </div>
  );
}
