import Link from 'next/link';
import type { Category } from '@/types/caption';

export function CategoryCard({ category, count }: { category: Category; count: number }) {
  return (
    <Link
      href={`/captions/${category.slug}`}
      className="group flex flex-col justify-between gap-3 rounded-card border border-ink/10 bg-white p-5 transition-colors hover:border-moss-500 dark:border-white/10 dark:bg-dusk-800"
    >
      <div>
        <p className="font-display text-lg text-ink dark:text-white">{category.name}</p>
        <p className="mt-1 text-sm text-ink/60 dark:text-white/60">{category.description}</p>
      </div>
      <p className="text-xs font-medium text-moss-600 dark:text-moss-300">
        {count} {count === 1 ? 'caption' : 'captions'}
      </p>
    </Link>
  );
}
