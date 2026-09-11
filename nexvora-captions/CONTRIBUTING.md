# Contributing to NexVora Captions

## Adding captions

1. Open the relevant file in `data/captions/<category>.json` (or create a new
   category — see below).
2. Add new entries following the `Caption` schema in `types/caption.ts`.
3. Give each caption a unique, sequential ID: `<category>-0001`, `<category>-0002`, etc.
   Continue from the highest existing number in that file — don't reuse IDs.
4. Run `npm run validate` before opening a pull request. CI will run the same
   check automatically (see `.github/workflows/content-validation.yml`).

See `CONTENT_GUIDE.md` for the full batch-writing workflow and quality bar.

## Adding a new category

1. Add an entry to `data/categories.json` (`slug`, `name`, `description`, optional `relatedSlugs`).
2. Create `data/captions/<slug>.json` with an empty array `[]` or your first batch.
3. Add the import in `lib/captions.ts` (see the `datasets` array — this is the
   one place every category file must be registered).
4. Run `npm run validate` and `npm run typecheck`.

## Code style

- TypeScript strict mode is on — avoid `any`.
- Keep components small and focused; shared logic goes in `lib/` or `hooks/`.
- Don't hard-code caption text inside components — it belongs in `data/captions/`.

## Before opening a PR

```bash
npm run lint
npm run typecheck
npm run validate
npm run build
```

All four should pass locally before requesting review.
