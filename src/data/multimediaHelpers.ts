import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Stałe – bez zmian
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

// Typ danych wejściowych z kolekcji
type MultimediaEntryData = CollectionEntry<'multimedia'>['data'];

// Funkcja pomocnicza: konwertuje wpis kolekcji na format identyczny jak stary MultimediaEntry
function toLegacyFormat(entry: CollectionEntry<'multimedia'>): MultimediaEntryData & { slug: string } {
  return {
    ...entry.data,
    slug: entry.data.slug,
  };
}

// Pobierz wszystkie wpisy (z cache – Astro sam zarządza)
export async function getAllEntries() {
  const entries = await getCollection('multimedia');
  return entries.map(toLegacyFormat);
}

// Pobierz wpisy dla konkretnego roku
export async function getEntriesByYear(year: number) {
  const all = await getAllEntries();
  return all.filter(entry => entry.year === year);
}

// Pobierz pojedynczy wpis
export async function getEntry(year: number, slug: string) {
  const entries = await getEntriesByYear(year);
  return entries.find(entry => entry.slug === slug) ?? null;
}

// Pobierz posortowane lata (malejąco)
export async function getYears() {
  const all = await getAllEntries();
  const yearsSet = new Set(all.map(entry => entry.year));
  return Array.from(yearsSet).sort((a, b) => b - a);
}
