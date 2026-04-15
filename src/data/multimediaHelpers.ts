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

// Typ wpisu kolekcji
export type MultimediaData = CollectionEntry<'multimedia'>['data'] & { slug: string };

function toLegacyFormat(entry: CollectionEntry<'multimedia'>): MultimediaData {
  return { ...entry.data, slug: entry.data.slug };
}

// ── Funkcje pobierające ────────────────────────────────────────

/** Wszystkie materiały posortowane malejąco po roku i dacie */
export async function getAllEntries(): Promise<MultimediaData[]> {
  const entries = await getCollection('multimedia');
  return entries
    .map(toLegacyFormat)
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

/** Materiały dla konkretnego roku */
export async function getEntriesByYear(year: number): Promise<MultimediaData[]> {
  const all = await getAllEntries();
  return all.filter(entry => entry.year === year);
}

/** Pojedynczy materiał po roku i slug */
export async function getEntry(year: number, slug: string): Promise<MultimediaData | null> {
  const entries = await getEntriesByYear(year);
  return entries.find(entry => entry.slug === slug) ?? null;
}

/** Posortowane lata (malejąco) */
export async function getYears(): Promise<number[]> {
  const all = await getAllEntries();
  const yearsSet = new Set(all.map(entry => entry.year));
  return Array.from(yearsSet).sort((a, b) => b - a);
}
