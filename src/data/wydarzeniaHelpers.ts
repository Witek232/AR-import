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
---
// src/components/WydarzeniaTeaser.astro
// Dane nadchodzących wydarzeń pobrane z Content Collections
import { getUpcomingWydarzenia, typeLabels, formatEventDate } from '../data/wydarzeniaHelpers';

const upcomingEvents = await getUpcomingWydarzenia(3);
---

<section
  id="wydarzenia-teaser"
  style="background:#EDE0C4; padding:clamp(4rem,8vw,7rem) clamp(1.25rem,4vw,2rem);"
>
  <div style="max-width:1100px; margin:0 auto;">

    <!-- Header -->
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:1.5rem; margin-bottom:clamp(2.5rem,5vw,4rem);">
      <div>
        <p class="reveal section-label" style="margin-bottom:0.75rem;">Najbliższe spotkania</p>
        <h2 class="reveal section-title" style="color:#1A1209; margin:0;">Nadchodzące wydarzenia</h2>
      </div>
      <a href="/wydarzenia" class="reveal wydarzenia-all-btn">
        Wszystkie wydarzenia →
      </a>
    </div>

    {upcomingEvents.length === 0 && (
      <p style="font-family:'IM Fell English',serif; font-style:italic; font-size:1.1rem; color:rgba(26,18,9,0.45); text-align:center; padding:3rem 0;">
        Brak zaplanowanych wydarzeń — zapraszamy wkrótce.
      </p>
    )}

    <!-- Events list -->
    {upcomingEvents.length > 0 && (
      <div style="display:flex; flex-direction:column; gap:0;">
        {upcomingEvents.map((event) => {
          const d    = formatEventDate(event.date);
          const type = typeLabels[event.type] ?? event.type;
          return (
            <div
              class="reveal card-hover wydarzenie-row"
              style="display:grid; grid-template-columns:auto 1fr; gap:clamp(1.25rem,3vw,2.5rem); padding:clamp(1.5rem,3.5vw,2.5rem) 0; border-bottom:1px solid rgba(26,18,9,0.1); cursor:pointer; align-items:start;"
            >
              <!-- Date block -->
              <div style="text-align:center; min-width:clamp(52px,10vw,70px); border-right:1px solid rgba(201,168,76,0.3); padding-right:clamp(1rem,2.5vw,1.75rem);">
                <div style="font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,5vw,3rem); font-weight:300; color:#C9A84C; line-height:1;">
                  {d.day}
                </div>
                <div style="font-family:'Crimson Pro',serif; font-size:clamp(0.65rem,1.5vw,0.75rem); letter-spacing:0.2em; text-transform:uppercase; color:rgba(26,18,9,0.45); margin-top:0.2rem;">
                  {d.month}
                </div>
                <div style="font-family:'Crimson Pro',serif; font-size:clamp(0.7rem,1.5vw,0.8rem); color:rgba(26,18,9,0.3);">
                  {d.year}
                </div>
              </div>

              <!-- Content -->
              <div>
                <div style="display:flex; gap:0.75rem; align-items:center; margin-bottom:0.5rem; flex-wrap:wrap;">
                  <span style="font-family:'Crimson Pro',serif; font-size:clamp(0.62rem,1.5vw,0.68rem); letter-spacing:0.22em; text-transform:uppercase; color:#C9A84C; border:1px solid rgba(201,168,76,0.35); padding:2px 8px;">
                    {type}
                  </span>
                  <span style="font-family:'Crimson Pro',serif; font-size:clamp(0.8rem,1.8vw,0.88rem); color:rgba(26,18,9,0.45); font-style:italic;">
                    {event.place}
                  </span>
                  {event.languages && event.languages.length > 1 && (
                    <span style="font-family:'Crimson Pro',serif; font-size:0.72rem; color:rgba(26,18,9,0.4); letter-spacing:0.1em;">
                      🌐 {event.languages.join('/')}
                    </span>
                  )}
                </div>
                <h3 style="font-family:'Cormorant Garamond',serif; font-size:clamp(1.1rem,3vw,1.6rem); font-weight:400; color:#1A1209; line-height:1.3; margin-bottom:0.5rem;">
                  {event.title}
                </h3>
                {event.description && (
                  <p style="font-family:'Crimson Pro',serif; font-style:italic; font-size:clamp(0.9rem,2vw,1rem); color:rgba(26,18,9,0.5); line-height:1.65; margin:0;">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}

  </div>
</section>

<style>
  .wydarzenie-row {
    transition: padding-left 0.3s ease;
  }
  .wydarzenie-row:hover {
    padding-left: 0.75rem !important;
  }

  .wydarzenia-all-btn {
    font-family: 'Crimson Pro', serif;
    font-size: clamp(0.82rem, 1.8vw, 0.9rem);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: none;
    border: 1px solid rgba(26, 18, 9, 0.25);
    color: rgba(26, 18, 9, 0.65);
    padding: 0.65rem 1.5rem;
    cursor: pointer;
    transition: all 0.25s;
    white-space: nowrap;
    text-decoration: none;
    display: inline-block;
  }
  .wydarzenia-all-btn:hover {
    border-color: #C9A84C;
    color: #C9A84C;
  }
</style>
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
