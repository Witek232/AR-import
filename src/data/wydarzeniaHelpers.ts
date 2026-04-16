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
  slug: string;  // <-- slug jest ZAWSZE obecny
};

function toLegacyFormat(entry: CollectionEntry<'wydarzenia'>): WydarzenieEntry {
  return {
    ...entry.data,
    // slug z frontmatter, a jeśli brak — użyj entry.id (nazwa pliku bez .md)
    slug: entry.data.slug ?? entry.id.replace(/\.md$/, ''),
    body: entry.body ?? '',
  };
}

// ── Formatowanie daty ─────────────────────────────────────────
export function formatEventDate(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return {
    day:   d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('pl-PL', { month: 'short' }).replace('.', ''),
    year:  d.getFullYear().toString(),
  };
}

// ── Pobieranie danych ─────────────────────────────────────────

export async function getAllWydarzenia(): Promise<WydarzenieEntry[]> {
  const entries = await getCollection('wydarzenia');
  return entries
    .map(toLegacyFormat)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getWydarzeniaUpcoming(): Promise<WydarzenieEntry[]> {
  const all = await getAllWydarzenia();
  return all.filter(e => e.status === 'upcoming');
}

export async function getWydarzeniaPast(): Promise<WydarzenieEntry[]> {
  const all = await getAllWydarzenia();
  return all.filter(e => e.status === 'past');
}

export async function getWydarzenieBySlug(slug: string): Promise<WydarzenieEntry | null> {
  const all = await getAllWydarzenia();
  return all.find(e => e.slug === slug) ?? null;
}

export async function getWydarzeniaYears(): Promise<number[]> {
  const all = await getAllWydarzenia();
  const years = new Set(all.map(e => new Date(e.date).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
}

export async function getSiblings(slug: string) {
  const all = await getAllWydarzenia();
  const idx = all.findIndex(e => e.slug === slug);
  return {
    prev: idx > 0              ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
