import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ShareButton } from '@/components/ShareButton';
import { CaptionGrid } from '@/components/CaptionGrid';
import { getAllCaptions, getCaptionById, getRelatedCaptions } from '@/lib/captions';

type Params = { id: string };

export function generateStaticParams() {
  return getAllCaptions().map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const caption = getCaptionById(params.id);
  if (!caption) return {};
  const title = caption.text.length > 60 ? `${caption.text.slice(0, 57)}...` : caption.text;
  return {
    title,
    description: `A ${caption.mood} ${caption.category} caption for ${caption.platforms.join(', ')}.`,
    alternates: { canonical: `/caption/${caption.id}` },
  };
}

export default function CaptionPage({ params }: { params: Params }) {
  const caption = getCaptionById(params.id);
  if (!caption) notFound();

  const related = getRelatedCaptions(caption);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href={`/captions/${caption.category}`} className="text-sm text-ink/50 hover:text-moss-600 dark:text-white/50">
        ← Back to {caption.category.replace('-', ' ')}
      </Link>

      <div className="mt-4 rounded-card border border-ink/10 bg-white p-8 dark:border-white/10 dark:bg-dusk-800">
        <p lang={caption.language} className="font-display text-2xl leading-snug text-ink dark:text-white sm:text-3xl">
          {caption.text}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <Field label="Category" value={caption.category} />
          <Field label="Mood" value={caption.mood} />
          <Field label="Language" value={caption.language === 'bn' ? 'Bengali' : 'English'} />
          <Field label="Length" value={caption.length} />
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {caption.tags.map((tag) => (
            <span key={tag} className="rounded-pill bg-moss-50 px-2 py-0.5 text-xs text-moss-700 dark:bg-moss-900/40 dark:text-moss-200">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {caption.platforms.map((platform) => (
            <span key={platform} className="rounded-pill border border-ink/15 px-2 py-0.5 text-xs text-ink/60 dark:border-white/15 dark:text-white/60">
              {platform}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <CopyButton text={caption.text} />
          <FavoriteButton id={caption.id} />
          <ShareButton text={caption.text} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl text-ink dark:text-white">More like this</h2>
          <div className="mt-4">
            <CaptionGrid captions={related} />
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink/40 dark:text-white/40">{label}</dt>
      <dd className="mt-0.5 capitalize text-ink dark:text-white">{value}</dd>
    </div>
  );
}
