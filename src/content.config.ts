// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── Multimedia ────────────────────────────────────────────────
const partSchema = z.object({
  id:          z.string().optional(),
  url:         z.string().url().optional(),
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
    type:        z.enum(['wyklad', 'seminarium', 'konferencja', 'sympozjum', 'warsztaty', 'spotkanie', 'uroczystosc',]),
    status:      z.enum(['upcoming', 'past']),
    languages:   z.array(z.string()).optional().default(['PL']),
    hasReport:   z.boolean().optional().default(false),
    reportUrl:   z.string().optional(),
    description: z.string().optional(),
  }),
});

// ── Cykle Artykułów (NOWOŚĆ) ──────────────────────────────────
const cyclesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cycles' }),
  schema: z.object({
    title:       z.string(),           // Nazwa cyklu wyświetlana na kafelku
    description: z.string(),           // Krótki opis cyklu na kafelku
    order:       z.number().optional(),// Opcjonalna kolejność wyświetlania kafelków na stronie listy
  }),
});

// ── Artykuły / Publikacje ─────────────────────────────────────
const articlesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title:        z.string(),
    dateDisplay:  z.string(),
    dateSortable: z.string(),
    source:       z.enum(['Nasz Dziennik', 'Niedziela', 'Inne', 'Filary']),
    excerpt:      z.string(),
    externalLink: z.string().optional(),
    duration:     z.string().optional(),
    // NOWE POLA DLA CYKLI:
    cycle:        z.string().optional(),       // ID cyklu (nazwa pliku .md z folderu cycles), np. "sekrety-rozanca"
    cycleOrder:   z.number().optional(),       // Kolejność w cyklu, np. 1, 2, 3
  }),
});

export const collections = {
  multimedia: multimediaCollection,
  wydarzenia: wydarzeniaCollection,
  cycles: cyclesCollection,         // <-- DODANE: Rejestracja nowej kolekcji
  articles: articlesCollection,
};
