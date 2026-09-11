export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-ink/15 px-6 py-16 text-center dark:border-white/15">
      <p className="font-display text-xl text-ink dark:text-white">{title}</p>
      {description && <p className="max-w-prose text-sm text-ink/60 dark:text-white/60">{description}</p>}
      {action}
    </div>
  );
}
