import type { Caption, CaptionFilters, Category } from '@/types/caption';
import categoriesData from '@/data/categories.json';

// One JSON module per category. Adding a new category means:
// 1) add a file in data/captions/<slug>.json
// 2) add an entry to data/categories.json
// 3) add the import + map entry below.
// This keeps each dataset file small (fast to edit, fast to diff in PRs)
// while the app still treats the library as a single combined dataset.
import love from '@/data/captions/love.json';
import romantic from '@/data/captions/romantic.json';
import attitude from '@/data/captions/attitude.json';
import funny from '@/data/captions/funny.json';
import motivation from '@/data/captions/motivation.json';
import sad from '@/data/captions/sad.json';
import emotional from '@/data/captions/emotional.json';
import friendship from '@/data/captions/friendship.json';
import bestFriend from '@/data/captions/best-friend.json';
import life from '@/data/captions/life.json';
import success from '@/data/captions/success.json';
import confidence from '@/data/captions/confidence.json';
import happiness from '@/data/captions/happiness.json';
import alone from '@/data/captions/alone.json';
import breakup from '@/data/captions/breakup.json';
import heartbreak from '@/data/captions/heartbreak.json';
import travel from '@/data/captions/travel.json';
import adventure from '@/data/captions/adventure.json';
import nature from '@/data/captions/nature.json';
import rain from '@/data/captions/rain.json';
import winter from '@/data/captions/winter.json';
import summer from '@/data/captions/summer.json';
import morning from '@/data/captions/morning.json';
import night from '@/data/captions/night.json';
import birthday from '@/data/captions/birthday.json';
import family from '@/data/captions/family.json';
import student from '@/data/captions/student.json';
import study from '@/data/captions/study.json';
import photography from '@/data/captions/photography.json';
import instagram from '@/data/captions/instagram.json';
import facebook from '@/data/captions/facebook.json';
import tiktok from '@/data/captions/tiktok.json';
import reels from '@/data/captions/reels.json';
import story from '@/data/captions/story.json';
import bio from '@/data/captions/bio.json';
import aesthetic from '@/data/captions/aesthetic.json';
import simple from '@/data/captions/simple.json';
import royal from '@/data/captions/royal.json';
import celebration from '@/data/captions/celebration.json';
import peace from '@/data/captions/peace.json';

const datasets: Caption[][] = [
  love, romantic, attitude, funny, motivation, sad, emotional, friendship,
  bestFriend, life, success, confidence, happiness, alone, breakup,
  heartbreak, travel, adventure, nature, rain, winter, summer, morning,
  night, birthday, family, student, study, photography, instagram,
  facebook, tiktok, reels, story, bio, aesthetic, simple, royal,
  celebration, peace,
] as unknown as Caption[][];

let _all: Caption[] | null = null;

/** Every published caption in the library, combined from all category files. */
export function getAllCaptions(): Caption[] {
  if (_all) return _all;
  _all = datasets.flat().filter((c) => c.status === 'published');
  return _all;
}

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategory(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function getCaptionsByCategory(slug: string): Caption[] {
  return getAllCaptions().filter((c) => c.category === slug);
}

export function getCaptionById(id: string): Caption | undefined {
  return getAllCaptions().find((c) => c.id === id);
}

export function getCategoryCount(slug: string): number {
  return getCaptionsByCategory(slug).length;
}

/** Case-insensitive, Bengali- and English-friendly search across text, tags, category, mood, language and platforms. */
export function searchCaptions(query: string, pool: Caption[] = getAllCaptions()): Caption[] {
  const q = query.trim().toLocaleLowerCase();
  if (!q) return pool;
  return pool.filter((c) => {
    const haystack = [
      c.text,
      c.category,
      c.mood,
      c.language,
      ...c.tags,
      ...c.platforms,
    ]
      .join(' ')
      .toLocaleLowerCase();
    return haystack.includes(q);
  });
}

export function filterCaptions(filters: CaptionFilters): Caption[] {
  let pool = getAllCaptions();

  if (filters.category) pool = pool.filter((c) => c.category === filters.category);
  if (filters.language) pool = pool.filter((c) => c.language === filters.language);
  if (filters.mood) pool = pool.filter((c) => c.mood === filters.mood);
  if (filters.length) pool = pool.filter((c) => c.length === filters.length);
  if (filters.platform) pool = pool.filter((c) => c.platforms.includes(filters.platform!));
  if (filters.query) pool = searchCaptions(filters.query, pool);

  return pool;
}

export function getRelatedCaptions(caption: Caption, limit = 6): Caption[] {
  const pool = getAllCaptions().filter((c) => c.id !== caption.id);

  const scored = pool.map((c) => {
    let score = 0;
    if (c.category === caption.category) score += 3;
    if (c.mood === caption.mood) score += 2;
    if (c.language === caption.language) score += 1;
    score += c.tags.filter((t) => caption.tags.includes(t)).length;
    return { caption: c, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.caption);
}

export function getRandomCaption(pool: Caption[] = getAllCaptions()): Caption | undefined {
  if (pool.length === 0) return undefined;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

export function getAllMoods(): string[] {
  return Array.from(new Set(getAllCaptions().map((c) => c.mood))).sort();
}

export function getAllPlatforms(): string[] {
  return Array.from(new Set(getAllCaptions().flatMap((c) => c.platforms))).sort();
}

export const TOTAL_CAPTION_COUNT = getAllCaptions().length;
