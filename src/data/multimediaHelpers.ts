// src/data/wydarzeniaHelpers.ts
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// ── Słowniki ──────────────────────────────────────────────────
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
  sympozjum:   '#4A6741',
  warsztaty:   '#3A5A7A',
  spotkanie:   '#6A4A7A',
};

// Typ danych wpisu wydarzeń
export type WydarzenieData = CollectionEntry<'wydarzenia'>['data'];

// ── Funkcje pobierające ────────────────────────────────────────

/** Wszystkie wydarzenia posortowane malejąco po dacie */
export async function getAllWydarzenia(): Promise<WydarzenieData[]> {
  const entries = await getCollection('wydarzenia');
  return entries
    .map(e => e.data)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Nadchodzące wydarzenia (status: 'upcoming'), posortowane rosnąco */
export async function getUpcomingWydarzenia(limit?: number): Promise<WydarzenieData[]> {
  const entries = await getCollection('wydarzenia');
  const upcoming = entries
    .map(e => e.data)
    .filter(e => e.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return limit !== undefined ? upcoming.slice(0, limit) : upcoming;
}

/** Archiwalne wydarzenia (status: 'past'), posortowane malejąco */
export async function getPastWydarzenia(): Promise<WydarzenieData[]> {
  const all = await getAllWydarzenia();
  return all.filter(e => e.status === 'past');
}

/** Pojedyncze wydarzenie po slug */
export async function getWydarzenie(slug: string): Promise<WydarzenieData | null> {
  const all = await getAllWydarzenia();
  return all.find(e => e.slug === slug) ?? null;
}

// ── Formatowanie daty ─────────────────────────────────────────
const monthsPL = [
  'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze',
  'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru',
];

export function formatEventDate(date: Date) {
  return {
    day:   String(date.getDate()).padStart(2, '0'),
    month: monthsPL[date.getMonth()],
    year:  String(date.getFullYear()),
  };
}
