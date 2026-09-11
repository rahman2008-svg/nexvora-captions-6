import Link from 'next/link';
import type { Caption } from '@/types/caption';
import { CopyButton } from './CopyButton';
import { FavoriteButton } from './FavoriteButton';
import { ShareButton } from './ShareButton';

export function CaptionCard({ caption }: { caption: Caption }) {
  return (
    <article className="flex flex-col justify-between gap-4 rounded-card border border-ink/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-dusk-800">
      <div className="space-y-3">
        <p
          lang={caption.language}
          className="text-[1.05rem] leading-relaxed text-ink dark:text-white/95"
        >
          {caption.text}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {caption.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill bg-moss-50 px-2 py-0.5 text-xs text-moss-700 dark:bg-moss-900/40 dark:text-moss-200"
            >
              #{tag}
            </span>
          ))}
        </div>
        <Link
          href={`/captions/${caption.category}`}
          className="inline-block text-xs font-medium uppercase tracking-wide text-clay-600 hover:underline dark:text-clay-300"
        >
          {caption.category.replace('-', ' ')}
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <CopyButton text={caption.text} />
        <FavoriteButton id={caption.id} />
        <ShareButton text={caption.text} url={typeof window !== 'undefined' ? `${window.location.origin}/caption/${caption.id}` : undefined} />
        <Link
          href={`/caption/${caption.id}`}
          className="ml-auto text-sm font-medium text-ink/60 hover:text-moss-600 dark:text-white/50 dark:hover:text-moss-300"
        >
          Open →
        </Link>
      </div>
    </article>
  );
}
