# Content Guide — Growing the Caption Library

NexVora Captions ships with a working sample dataset (see "Current dataset
size" in the README) so every feature — search, filters, pagination,
generator, related captions — has real data to run against today. Growing
that toward 10,000+ captions is a content task, not an architecture change:
the data loading, search, and pagination code already assumes a much larger
library.

## Batch size

Write captions in batches of **100 per file per batch**, not all 10,000 in
one sitting. This keeps each PR reviewable and keeps ID numbering simple.

Example for `data/captions/love.json`:

- Batch 1: `love-0001` → `love-0100`
- Batch 2: `love-0101` → `love-0200`
- Batch 3: `love-0201` → `love-0300`

## Using a writing assistant (e.g. Gemini, or any LLM)

A reasonable prompt structure for generating one batch:

```
Write 100 original, non-copyrighted social media captions about [category],
mood: [mood], in [language]. Rules:
- No song lyrics, poem excerpts, movie quotes, or copyrighted lines.
- No fabricated quotes attributed to real people.
- Vary sentence length and tone; avoid repeating the same sentence structure.
- Keep each caption under 25 words unless explicitly writing "long" length.
- Output as a JSON array matching this schema: { id, text, language, category,
  mood, length, tags, platforms, status }.
```

Always review the output — don't paste it straight into the repo.

## Avoiding duplicates

Before merging a new batch:

1. Run `npm run validate` — it checks for duplicate IDs and duplicate caption
   text (case-insensitive, whitespace-trimmed) across the *entire* dataset,
   not just the file you edited.
2. Skim for near-duplicates the script won't catch (same idea, reworded) —
   this is a human judgment call the validator can't fully automate.

## Sequential IDs

IDs must be unique across the whole dataset, not just within a file. The
`<category>-####` convention makes collisions easy to avoid — always continue
from the highest number already in that category's file.

## Valid JSON

Common mistakes that break `npm run validate` or the build:

- Trailing commas after the last item in an array or object.
- Missing a comma between two caption objects.
- Smart quotes (`"` `"`) instead of straight quotes (`"`) around string values.
- Forgetting to close a bracket after pasting in a batch.

Validate locally with `npm run validate` before committing — it will point to
the exact file and index of any problem.

## Category consistency

Every caption's `"category"` field must match a `slug` in
`data/categories.json` exactly. If you're adding captions for a brand-new
category, add it to `categories.json` first (see `CONTRIBUTING.md`).

## Metadata fields

- `mood` — free text, but stay consistent within a category (check existing
  moods in that file first so filters don't fragment into near-duplicates
  like `"romantic"` vs `"Romantic"` vs `"romance"`).
- `length` — `short` (under ~50 characters), `medium`, or `long`. Match it to
  the actual caption, since the length filter relies on it being accurate.
- `platforms` — pick the platforms the caption actually suits; a long
  reflective caption may not fit `story`, for instance.

## Quality control checklist

Before submitting a batch, check that every caption:

- [ ] Is original — not copied from songs, poems, books, or films.
- [ ] Doesn't fabricate a quote and attribute it to a real person.
- [ ] Matches its declared `language`, `length`, and `category`.
- [ ] Reads naturally — no leftover prompt text or placeholder brackets.
- [ ] Has a unique `id` and isn't a near-duplicate of an existing caption.

## Scaling path

| Milestone | What changes |
|---|---|
| ~1,000 captions | No code changes needed. |
| ~10,000 captions | Still file-based; consider splitting very large category files (e.g. `love-01.json`, `love-02.json`) and registering both in `lib/captions.ts` if a single file gets unwieldy to review in PRs. |
| 50,000+ / 100,000+ | Move from JSON files to a database (see Version 2.0 in the README roadmap) so the app isn't loading the entire dataset into a serverless function's memory on every request. The `lib/captions.ts` functions (`filterCaptions`, `searchCaptions`, `getRelatedCaptions`, etc.) are written as the seam to swap: their signatures can stay the same while the implementation moves from in-memory arrays to database queries. |
