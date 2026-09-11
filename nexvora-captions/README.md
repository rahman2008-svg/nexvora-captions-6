# NexVora Captions

A fast, mobile-first caption library and dataset-based caption generator.
Built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

Developed by **Prince AR Abdur Rahman** · Published by **NexVora Lab's Ofc**

## Current dataset size

This build ships with **14,563 original sample captions across all 40
categories** — six categories fully built out at 800 each (`aesthetic`,
`bio`, `celebration`, `royal`, `simple`, `travel`), five more in the
700s (`sad`, `emotional`, `friendship`, `funny`, `motivation`), and the
remaining categories ranging from 100–500 each. The architecture (data
loading,
search, filtering, pagination, SEO, validation) is built to scale to
10,000+, 50,000+, and eventually 100,000+ captions without changes to the
app code — only more JSON content. See `CONTENT_GUIDE.md` for the batch
workflow used to grow the dataset, and the "Scaling path" table in that file
for what changes at each order of magnitude.

Category pages and the homepage always show the **real** count from the
dataset (`getCategoryCount()` in `lib/captions.ts`) — never a hard-coded
number — so counts stay accurate as content grows.

## Features

- Browse, search, and filter a growing caption library
- Category pages with real counts, related categories, and pagination
- Individual caption pages with SEO metadata and "more like this"
- Copy, save (favorites via `localStorage`, no login required), and share
  (native Web Share API with a copy fallback)
- Random caption picker, with optional category/language narrowing
- Dataset-based caption generator (filters the library — no AI API, no
  false "AI-generated" claims)
- Light/dark mode, persisted locally
- Bengali and English captions, with the schema ready for more languages
- `sitemap.xml`, `robots.txt`, Open Graph and Twitter metadata
- `scripts/validate-captions.js` + a GitHub Actions workflow that runs it
  on every PR touching caption data

## Tech stack

- Next.js 14 (App Router) + React 18 + TypeScript (strict mode)
- Tailwind CSS
- JSON-based dataset (`data/captions/*.json`) — no database required for v1
- `localStorage` for anonymous favorites and theme preference
- No paid APIs, no AI API required for core functionality

## Project structure

```
app/               Routes (App Router)
  captions/        Browse-all page + /captions/[category]
  caption/[id]/     Individual caption page
  random/           Random caption picker
  generator/        Dataset-based generator
  favorites/        Saved captions (client-side, localStorage)
  about/ privacy/ terms/ contact/
components/        Reusable UI (CaptionCard, FilterPanel, Header, ...)
data/
  categories.json   Category metadata
  captions/*.json   One file per category — the actual caption dataset
lib/               Data access, search/filter/pagination logic
types/             Shared TypeScript types (Caption, Category, ...)
hooks/             useFavorites, useTheme
scripts/           validate-captions.js
.github/workflows/ content-validation.yml
```

## Caption schema

```ts
type Caption = {
  id: string;            // unique, e.g. "love-0001"
  text: string;
  language: 'bn' | 'en';
  category: string;      // must match a slug in data/categories.json
  mood: string;
  length: 'short' | 'medium' | 'long';
  tags: string[];
  platforms: Array<'facebook' | 'instagram' | 'tiktok' | 'reels' | 'story' | 'bio' | 'whatsapp'>;
  status: 'draft' | 'published';
};
```

Only captions with `status: "published"` are shown on the site.

## Adding captions

See `CONTENT_GUIDE.md` for the full workflow (batching, avoiding
duplicates, ID conventions) and `CONTRIBUTING.md` for the PR checklist. In
short:

1. Add entries to `data/captions/<category>.json`.
2. Run `npm run validate`.
3. Open a PR — CI runs the same validation automatically.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Other commands

```bash
npm run build       # production build
npm start           # run the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run validate     # validate data/captions/*.json
```

## Deployment (Vercel)

1. Create a GitHub repository and push this project.
2. In Vercel, "Import Project" and select the repository.
3. Set the `NEXT_PUBLIC_SITE_URL` environment variable (see `.env.example`)
   to your production domain — it's used for canonical URLs, the sitemap,
   and Open Graph metadata.
4. Deploy. No paid infrastructure is required for Version 1.

## Roadmap

**Version 1.0 (this build)**
Search, filters, categories, copy/save/share, random, dataset generator,
SEO, responsive UI, About/Privacy/Terms/Contact, content validation CI.

**Version 2.0**
Database-backed storage, admin dashboard with real authentication, cloud
favorites, collections, analytics, user submissions.

**Version 3.0**
AI-assisted caption generation (as an addition to, not a replacement for,
the dataset generator), personalized recommendations, more languages, PWA
support, advanced moderation.

## Known limitations of this build

- The dataset is a representative sample (14,563 captions across all 40
  categories, ranging from 100 to 800 per category), not the full 10,000+
  per-category target implied by the original spec — see "Current dataset
  size" above.
- `/admin` is intentionally not implemented in this version: the spec calls
  for admin tooling to either use real authentication or be marked as
  future functionality, and no auth provider is configured yet. It's
  listed under Version 2.0 above rather than shipped as an insecure stub.
- PWA support (installable app, offline shell, service worker) is not yet
  implemented; see Version 3.0.
- This project has not been run through `npm install` / `npm run build` in
  this environment (no network access here) — review the code and run the
  commands above locally before deploying.

## License

MIT — see `LICENSE`.
