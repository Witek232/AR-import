// src/data/multimediaHelpers.ts
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// ── Słowniki ──────────────────────────────────────────────────
export const categoryLabels: Record<string, string> = {
  wyklad:      'Wykład',
  seminarium:  'Seminarium',
  konferencja: 'Konferencja',
  inne:        'Inne',
};

export const categoryColors: Record<string, string> = {
  wyklad:      '#C9A84C',
  seminarium:  '#7A5C2E',
  konferencja: '#8B3A3A',
  inne:        '#4A6741',
};

// Typ eksportowany — slug zawsze string
export type MultimediaEntry = CollectionEntry<'multimedia'>['data'] & { slug: string };

/**
 * Slug z frontmattera; fallback: entry.id (Astro 5 = ścieżka pliku bez rozszerzenia)
 */
function resolveSlug(entry: CollectionEntry<'multimedia'>): string {
  if (entry.data.slug) return entry.data.slug;
  return entry.id.replace(/\.mdx?$/, '');
}

function toEntry(entry: CollectionEntry<'multimedia'>): MultimediaEntry {
  return { ...entry.data, slug: resolveSlug(entry) };
}

// ── Funkcje pobierające ────────────────────────────────────────

/** Wszystkie materiały posortowane malejąco po roku, potem po dacie */
export async function getAllEntries(): Promise<MultimediaEntry[]> {
  const entries = await getCollection('multimedia');
  return entries
    .map(toEntry)
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/** Materiały dla konkretnego roku */
export async function getEntriesByYear(year: number): Promise<MultimediaEntry[]> {
  const all = await getAllEntries();
  return all.filter(e => e.year === year);
}

/** Pojedynczy materiał po roku i slug */
export async function getEntry(year: number, slug: string): Promise<MultimediaEntry | null> {
  const entries = await getEntriesByYear(year);
  return entries.find(e => e.slug === slug) ?? null;
}

/** Posortowane lata (malejąco) */
export async function getYears(): Promise<number[]> {
  const all = await getAllEntries();
  const yearsSet = new Set(all.map(e => e.year));
  return Array.from(yearsSet).sort((a, b) => b - a);
}
