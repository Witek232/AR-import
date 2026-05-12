// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── Multimedia ────────────────────────────────────────────────
const partSchema = z.object({
  id:          z.string().optional(),   // opcjonalne, jak wcześniej
  url:         z.string().url().optional(), // opcjonalne, dla linków do plików
  label:       z.string(),
  duration:    z.string().optional(),
  description: z.string().optional(),
  analysis:    z.string().optional(),
});

const multimediaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/multimedia' }),
  schema: z.object({
    title:        z.string(),
    date:         z.coerce.date(),
    dateSortable: z.string().optional(),
    place:        z.string().optional(),
    category:     z.enum(['wykład', 'rozważania', 'konferencja', 'homilia', 'kazanie', 'wywiad', 'spotkanie', 'rozmowa', 'rekolekcje', 'inne']),
    tags:         z.array(z.string()).optional(),
    description:  z.string(),
    parts:        z.array(partSchema),
    year:         z.number(),
  }),
});

// ── Wydarzenia ────────────────────────────────────────────────
const wydarzeniaCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wydarzenia' }),
  schema: z.object({
    title:       z.string(),
    date:        z.coerce.date(),
    place:       z.string(),
    type:        z.enum(['wyklad', 'seminarium', 'konferencja', 'sympozjum', 'warsztaty', 'spotkanie']),
    status:      z.enum(['upcoming', 'past']),
    languages:   z.array(z.string()).optional().default(['PL']),
    hasReport:   z.boolean().optional().default(false),
    reportUrl:   z.string().optional(),
    description: z.string().optional(),
  }),
});

// ── Artykuły / Publikacje ─────────────────────────────────────
const articlesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title:        z.string(),
    dateDisplay:  z.string(),                                 // np. "15 marca 2024" (do wyświetlenia)
    dateSortable: z.string(),                                 // np. "2024-03-15" (do sortowania, ZAWSZE string!)
    source:       z.enum(['Nasz Dziennik', 'Niedziela', 'Inne', 'Filary']),
    excerpt:      z.string(),
    externalLink: z.string().optional(),                      // Jeśli podasz link (np. do gazety), ominie wewnętrzną podstronę
    duration:     z.string().optional(),                      // Opcjonalnie, np. dla audycji radiowych
  }),
});

export const collections = {
  multimedia: multimediaCollection,
  wydarzenia: wydarzeniaCollection,
  articles: articlesCollection,
};
