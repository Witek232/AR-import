import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// ── Stałe ────────────────────────────────────────────────────
export const typeLabels: Record<string, string> = {
  wyklad:      'Wykład',
  seminarium:  'Seminarium',
  konferencja: 'Konferencja',
  sympozjum:   'Sympozjum',
  warsztaty:   'Warsztaty',
  spotkanie:   'Spotkanie',
};

export const typeColors: Record<string, string> = {
  wyklad:      '#C9A84C',
  seminarium:  '#7A5C2E',
  konferencja: '#8B3A3A',
  sympozjum:   '#4A5A8B',
  warsztaty:   '#4A6741',
  spotkanie:   '#6A4A7A',
};

// ── Typ pomocniczy ───────────────────────────────────────────
type WydarzenieEntry = CollectionEntry<'wydarzenia'>['data'] & {
  body: string;
};

function toLegacyFormat(entry: CollectionEntry<'wydarzenia'>): WydarzenieEntry {
  return {
    ...entry.data,
    body: entry.body ?? '',
  };
}

// ── Pobieranie danych ─────────────────────────────────────────

/** Wszystkie wydarzenia posortowane malejąco po dacie */
export async function getAllWydarzenia(): Promise<WydarzenieEntry[]> {
  const entries = await getCollection('wydarzenia');
  return entries
    .map(toLegacyFormat)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Nadchodzące wydarzenia */
export async function getWydarzeniaUpcoming(): Promise<WydarzenieEntry[]> {
  const all = await getAllWydarzenia();
  return all.filter(e => e.status === 'upcoming');
}

/** Archiwalne wydarzenia */
export async function getWydarzeniaPast(): Promise<WydarzenieEntry[]> {
  const all = await getAllWydarzenia();
  return all.filter(e => e.status === 'past');
}

/** Pojedyncze wydarzenie po slug */
export async function getWydarzenieBySlug(slug: string): Promise<WydarzenieEntry | null> {
  const all = await getAllWydarzenia();
  return all.find(e => e.slug === slug) ?? null;
}

/** Lista unikalnych lat (malejąco) */
export async function getWydarzeniaYears(): Promise<number[]> {
  const all = await getAllWydarzenia();
  const years = new Set(all.map(e => e.year));
  return Array.from(years).sort((a, b) => b - a);
}

/** Poprzednie i następne wydarzenie (do nawigacji na stronie detalu) */
export async function getSiblings(slug: string) {
  const all = await getAllWydarzenia();
  const idx = all.findIndex(e => e.slug === slug);
  return {
    prev: idx > 0             ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
