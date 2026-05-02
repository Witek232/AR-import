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
  // UWAGA: brak type: 'content' – usuwamy, używamy loadera
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

export const collections = {
  multimedia: multimediaCollection,
  wydarzenia: wydarzeniaCollection,
};