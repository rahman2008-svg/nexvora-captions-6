import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { CaptionCard } from '@/components/CaptionCard';
import {
  getAllCaptions,
  getCategories,
  getCategoryCount,
  TOTAL_CAPTION_COUNT,
} from '@/lib/captions';

const POPULAR_SLUGS = ['love', 'attitude', 'funny', 'motivation', 'sad', 'friendship', 'travel', 'aesthetic'];

export default function HomePage() {
  const categories = getCategories();
  const popular = POPULAR_SLUGS.map((slug) => categories.find((c) => c.slug === slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c)
  );

  const all = getAllCaptions();
  const trending = all.slice(0, 6);
  const latest = [...all].slice(-6).reverse();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-ink/10 bg-gradient-to-b from-moss-50 to-paper dark:border-white/10 dark:from-dusk-900 dark:to-dusk-950">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-24">
          <p className="rounded-pill bg-white px-3 py-1 text-xs font-medium text-moss-700 shadow-sm dark:bg-dusk-800 dark:text-moss-200">
            {TOTAL_CAPTION_COUNT}+ captions and growing
          </p>
          <h1 className="max-w-2xl font-display text-4xl leading-tight text-ink dark:text-white sm:text-6xl">
            Find the Perfect Caption
          </h1>
          <p className="max-w-xl text-lg text-ink/70 dark:text-white/70">
            Discover thousands of captions for every mood, moment and social platform.
          </p>
          <SearchBar action="/captions" placeholder="Search 10,000+ captions..." />
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/random" className="rounded-pill bg-moss-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-moss-700">
              Get a random caption
            </Link>
            <Link href="/generator" className="rounded-pill border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink hover:border-moss-500 dark:border-white/20 dark:text-white">
              Try the generator
            </Link>
          </div>
        </div>
      </section>

      {/* Popular categories */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink dark:text-white">Popular categories</h2>
          <Link href="/captions" className="text-sm font-medium text-moss-600 hover:underline dark:text-moss-300">
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {popular.map((category) => (
            <CategoryCard key={category.slug} category={category} count={getCategoryCount(category.slug)} />
          ))}
        </div>
      </section>

      {/* Trending captions */}
      <section className="border-t border-ink/10 bg-white py-14 dark:border-white/10 dark:bg-dusk-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl text-ink dark:text-white">Trending captions</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((caption) => (
              <CaptionCard key={caption.id} caption={caption} />
            ))}
          </div>
        </div>
      </section>

      {/* Random CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-start gap-4 rounded-card bg-clay-500 px-8 py-10 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl">Not sure what you're after?</h2>
            <p className="mt-1 text-clay-50/90">Pull a random caption and see where it takes your post.</p>
          </div>
          <Link href="/random" className="shrink-0 rounded-pill bg-white px-6 py-3 text-sm font-medium text-clay-700">
            Random Caption
          </Link>
        </div>
      </section>

      {/* Latest captions */}
      <section className="border-t border-ink/10 py-14 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl text-ink dark:text-white">Latest additions</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((caption) => (
              <CaptionCard key={caption.id} caption={caption} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform & language sections */}
      <section className="border-t border-ink/10 bg-white py-14 dark:border-white/10 dark:bg-dusk-900">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6">
          <div>
            <h2 className="font-display text-xl text-ink dark:text-white">Built for every platform</h2>
            <p className="mt-2 text-sm text-ink/60 dark:text-white/60">
              Filter by Instagram, Facebook, TikTok, Reels, Story, Bio, or WhatsApp Status.
            </p>
            <Link href="/captions" className="mt-4 inline-block text-sm font-medium text-moss-600 hover:underline dark:text-moss-300">
              Browse by platform →
            </Link>
          </div>
          <div>
            <h2 className="font-display text-xl text-ink dark:text-white">Bengali &amp; English</h2>
            <p className="mt-2 text-sm text-ink/60 dark:text-white/60">
              Search and filter captions in Bengali or English, with more languages planned.
            </p>
            <Link href="/captions?language=bn" className="mt-4 inline-block text-sm font-medium text-moss-600 hover:underline dark:text-moss-300">
              Browse Bengali captions →
            </Link>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl text-ink dark:text-white">Everything you need to post faster</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { title: 'Search & filter', desc: 'Find captions by mood, length, category, language, or platform.' },
            { title: 'Save favorites', desc: 'Keep the ones you like — stored right on your device.' },
            { title: 'Dataset generator', desc: 'Generate a caption from the library that matches what you need, no AI required.' },
          ].map((f) => (
            <div key={f.title} className="rounded-card border border-ink/10 p-5 dark:border-white/10">
              <p className="font-display text-lg text-ink dark:text-white">{f.title}</p>
              <p className="mt-1 text-sm text-ink/60 dark:text-white/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="border-t border-ink/10 bg-white py-14 dark:border-white/10 dark:bg-dusk-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-xl text-ink dark:text-white">About the developer</h2>
              <p className="mt-2 text-sm text-ink/60 dark:text-white/60">
                NexVora Captions is built by Prince AR Abdur Rahman, an independent app developer.
              </p>
              <Link href="/about" className="mt-3 inline-block text-sm font-medium text-moss-600 hover:underline dark:text-moss-300">
                Read more →
              </Link>
            </div>
            <div>
              <h2 className="font-display text-xl text-ink dark:text-white">About NexVora Lab&apos;s Ofc</h2>
              <p className="mt-2 text-sm text-ink/60 dark:text-white/60">
                Building fast, beautiful, privacy-friendly applications for everyday use.
              </p>
              <Link href="/about" className="mt-3 inline-block text-sm font-medium text-moss-600 hover:underline dark:text-moss-300">
                Read more →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
