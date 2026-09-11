import type { MetadataRoute } from 'next';
import { getAllCaptions, getCategories } from '@/lib/captions';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexvoracaptions.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/captions',
    '/random',
    '/generator',
    '/favorites',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'weekly' as const,
  }));

  const categoryRoutes = getCategories().map((c) => ({
    url: `${SITE_URL}/captions/${c.slug}`,
    changeFrequency: 'weekly' as const,
  }));

  const captionRoutes = getAllCaptions().map((c) => ({
    url: `${SITE_URL}/caption/${c.id}`,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...categoryRoutes, ...captionRoutes];
}
