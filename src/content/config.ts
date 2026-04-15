import { defineCollection, z } from 'astro:content';

// ── Multimedia ────────────────────────────────────────────────
const partSchema = z.object({
  id:          z.string(),
  label:       z.string(),
  duration:    z.string(),
  description: z.string().optional(),
});

const multimediaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // slug usunięty — Astro generuje go automatycznie z nazwy pliku
    title:        z.string(),
    date:         z.coerce.date(),
    dateSortable: z.string().optional(),
    place:        z.string().optional(),
    category:     z.enum(['wyklad', 'seminarium', 'konferencja', 'inne']),
    tags:         z.array(z.string()).optional(),
    description:  z.string(),
    parts:        z.array(partSchema),
    year:         z.number(),
  }),
});

// ── Wydarzenia ────────────────────────────────────────────────
const wydarzeniaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // slug usunięty — Astro generuje go automatycznie z nazwy pliku
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
