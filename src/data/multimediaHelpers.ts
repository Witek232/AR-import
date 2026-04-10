import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// ── Stałe ────────────────────────────────────────────────────
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

// ── Typ pomocniczy ───────────────────────────────────────────
type MultimediaEntryData = CollectionEntry<'multimedia'>['data'];

function toLegacyFormat(entry: CollectionEntry<'multimedia'>): MultimediaEntryData & { slug: string } {
  return {
    ...entry.data,
    slug: entry.data.slug,
  };
}

// ── Pobieranie danych ─────────────────────────────────────────

/** Wszystkie wpisy (cache Astro) */
export async function getAllEntries() {
  const entries = await getCollection('multimedia');
  return entries
    .map(toLegacyFormat)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Wpisy dla konkretnego roku */
export async function getEntriesByYear(year: number) {
  const all = await getAllEntries();
  return all.filter(entry => entry.year === year);
}

/** Pojedynczy wpis */
export async function getEntry(year: number, slug: string) {
  const entries = await getEntriesByYear(year);
  return entries.find(entry => entry.slug === slug) ?? null;
}

/** Posortowane lata (malejąco) */
export async function getYears(): Promise<number[]> {
  const all = await getAllEntries();
  const yearsSet = new Set(all.map(entry => entry.year));
  return Array.from(yearsSet).sort((a, b) => b - a);
}

/** Wpisy pogrupowane według roku — wygodne dla multimedia/index */
export async function getEntriesGroupedByYear(): Promise<Record<number, ReturnType<typeof toLegacyFormat>[]>> {
  const all = await getAllEntries();
  const grouped: Record<number, typeof all> = {};
  for (const entry of all) {
    if (!grouped[entry.year]) grouped[entry.year] = [];
    grouped[entry.year].push(entry);
  }
  return grouped;
}
