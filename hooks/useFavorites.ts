'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'nexvora:favorites';

function readStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    // Corrupt or inaccessible storage (private browsing, quota, bad JSON) — fail safe.
    return [];
  }
}

function writeStorage(ids: string[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage unavailable or full — favorites just won't persist this session.
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(readStorage());
    setHydrated(true);

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setIds(readStorage());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const toggleFavorite = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeStorage(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((x) => x !== id);
      writeStorage(next);
      return next;
    });
  }, []);

  return { favoriteIds: ids, isFavorite, toggleFavorite, removeFavorite, hydrated };
}
