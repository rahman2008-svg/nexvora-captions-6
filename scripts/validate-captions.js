#!/usr/bin/env node
/**
 * Validates every file in data/captions/*.json against the caption schema.
 * Run with: npm run validate
 * Exits with a non-zero status if any validation errors are found, so it
 * can be used as a CI gate (see .github/workflows/content-validation.yml).
 */

const fs = require('fs');
const path = require('path');

const CAPTIONS_DIR = path.join(__dirname, '..', 'data', 'captions');
const CATEGORIES_PATH = path.join(__dirname, '..', 'data', 'categories.json');

const VALID_LANGUAGES = ['bn', 'en'];
const VALID_LENGTHS = ['short', 'medium', 'long'];
const VALID_PLATFORMS = ['facebook', 'instagram', 'tiktok', 'reels', 'story', 'bio', 'whatsapp'];
const VALID_STATUS = ['draft', 'published'];
const REQUIRED_FIELDS = ['id', 'text', 'language', 'category', 'mood', 'length', 'tags', 'platforms', 'status'];

function loadJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { __parseError: err.message };
  }
}

function main() {
  const errors = [];
  const seenIds = new Map(); // id -> file
  const seenTexts = new Map(); // normalized text -> id
  let validCategorySlugs = [];

  if (!fs.existsSync(CATEGORIES_PATH)) {
    errors.push('data/categories.json is missing.');
  } else {
    const categories = loadJson(CATEGORIES_PATH);
    if (categories.__parseError) {
      errors.push(`data/categories.json is invalid JSON: ${categories.__parseError}`);
    } else {
      validCategorySlugs = categories.map((c) => c.slug);
    }
  }

  if (!fs.existsSync(CAPTIONS_DIR)) {
    console.error('data/captions directory not found.');
    process.exit(1);
  }

  const files = fs.readdirSync(CAPTIONS_DIR).filter((f) => f.endsWith('.json'));
  let total = 0;
  let valid = 0;
  let duplicateIds = 0;
  let duplicateCaptions = 0;
  let invalidCategories = 0;
  let invalidLanguages = 0;

  for (const file of files) {
    const filePath = path.join(CAPTIONS_DIR, file);
    const data = loadJson(filePath);

    if (data.__parseError) {
      errors.push(`${file}: invalid JSON — ${data.__parseError}`);
      continue;
    }
    if (!Array.isArray(data)) {
      errors.push(`${file}: expected a JSON array of captions.`);
      continue;
    }

    data.forEach((entry, index) => {
      total += 1;
      const loc = `${file}[${index}]`;
      let entryValid = true;

      for (const field of REQUIRED_FIELDS) {
        if (entry[field] === undefined || entry[field] === null) {
          errors.push(`${loc}: missing required field "${field}"`);
          entryValid = false;
        }
      }

      if (entry.id !== undefined && typeof entry.id !== 'string') {
        errors.push(`${loc}: "id" must be a string`);
        entryValid = false;
      }
      if (entry.text !== undefined) {
        if (typeof entry.text !== 'string' || entry.text.trim().length === 0) {
          errors.push(`${loc}: "text" must be a non-empty string`);
          entryValid = false;
        }
      }
      if (entry.language !== undefined && !VALID_LANGUAGES.includes(entry.language)) {
        errors.push(`${loc}: invalid language "${entry.language}"`);
        invalidLanguages += 1;
        entryValid = false;
      }
      if (entry.category !== undefined && validCategorySlugs.length > 0 && !validCategorySlugs.includes(entry.category)) {
        errors.push(`${loc}: invalid category "${entry.category}"`);
        invalidCategories += 1;
        entryValid = false;
      }
      if (entry.length !== undefined && !VALID_LENGTHS.includes(entry.length)) {
        errors.push(`${loc}: invalid length "${entry.length}"`);
        entryValid = false;
      }
      if (entry.status !== undefined && !VALID_STATUS.includes(entry.status)) {
        errors.push(`${loc}: invalid status "${entry.status}"`);
        entryValid = false;
      }
      if (entry.tags !== undefined && !Array.isArray(entry.tags)) {
        errors.push(`${loc}: "tags" must be an array`);
        entryValid = false;
      }
      if (entry.platforms !== undefined) {
        if (!Array.isArray(entry.platforms)) {
          errors.push(`${loc}: "platforms" must be an array`);
          entryValid = false;
        } else {
          for (const p of entry.platforms) {
            if (!VALID_PLATFORMS.includes(p)) {
              errors.push(`${loc}: invalid platform "${p}"`);
              entryValid = false;
            }
          }
        }
      }

      if (entry.id) {
        if (seenIds.has(entry.id)) {
          errors.push(`${loc}: duplicate id "${entry.id}" (also in ${seenIds.get(entry.id)})`);
          duplicateIds += 1;
          entryValid = false;
        } else {
          seenIds.set(entry.id, loc);
        }
      }

      if (entry.text) {
        const normalized = entry.text.trim().toLowerCase();
        if (seenTexts.has(normalized)) {
          errors.push(`${loc}: duplicate caption text (also "${seenTexts.get(normalized)}")`);
          duplicateCaptions += 1;
          entryValid = false;
        } else {
          seenTexts.set(normalized, entry.id || loc);
        }
      }

      if (entryValid) valid += 1;
    });
  }

  console.log('Caption Validation Report');
  console.log('==========================');
  console.log(`Total:              ${total}`);
  console.log(`Valid:              ${valid}`);
  console.log(`Errors:             ${errors.length}`);
  console.log(`Duplicate IDs:      ${duplicateIds}`);
  console.log(`Duplicate captions: ${duplicateCaptions}`);
  console.log(`Invalid categories: ${invalidCategories}`);
  console.log(`Invalid languages:  ${invalidLanguages}`);

  if (errors.length > 0) {
    console.log('\nDetails:');
    errors.slice(0, 200).forEach((e) => console.log(`  - ${e}`));
    if (errors.length > 200) {
      console.log(`  ...and ${errors.length - 200} more`);
    }
    process.exit(1);
  }

  console.log('\nAll captions valid.');
  process.exit(0);
}

main();
