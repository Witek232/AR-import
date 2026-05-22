// src/data/wydarzeniaHelpers.ts
import { getCollection } from 'astro:content';

export const typeLabels: Record<string, string> = {
  konferencja: 'Konferencja',
  seminarium: 'Seminarium',
  wyklad: 'Wykład',
  spotkanie: 'Spotkanie',
  msza: 'Msza święta',
};

export const typeColors: Record<string, string> = {
  konferencja: '#7A1C2E',
  seminarium: '#C9A84C',
  wyklad: '#4A7C59',
  spotkanie: '#5B4A6F',
  msza: '#8B4513',
};

// Automatyczne określenie statusu na podstawie daty
export function getEventStatus(eventDate: Date): 'upcoming' | 'past' {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);
  
  return event >= today ? 'upcoming' : 'past';
}

export function formatEventDate(date: Date) {
  const d = new Date(date);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('pl-PL', { month: 'short' }).replace('.', ''),
    year: d.getFullYear(),
    full: d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

export async function getAllWydarzenia() {
  const entries = await getCollection('wydarzenia');
  
  return entries
    .map((entry) => {
      const slug = entry.data.slug ?? entry.id.replace(/\.md$/, '');
      const status = getEventStatus(entry.data.date); // AUTOMATYCZNY STATUS
      
      return {
        ...entry.data,
        slug,
        status,
        body: entry.body ?? '',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getSiblings(currentSlug: string) {
  const all = await getAllWydarzenia();
  const idx = all.findIndex((e) => e.slug === currentSlug);
  
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
