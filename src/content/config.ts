import { defineCollection, z } from 'astro:content';

// ── Multimedia audiowizualne ──────────────────────────────────
const partSchema = z.object({
  id:          z.string(),
  label:       z.string(),
  duration:    z.string(),
  description: z.string().optional(),
});

const multimediaCollection = defineCollection({
  type: 'content',
  schema: z.object({
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
// ── Wydarzenia ───────────────────────────────────────────────
const wydarzenieCollection = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string().optional(),
    title:        z.string(),
    titleEN:      z.string().optional(),
    titleDE:      z.string().optional(),
    date:         z.coerce.date(),
    dateSortable: z.string().optional(),
    place:        z.string().optional(),
    type:         z.enum(['wyklad', 'seminarium', 'konferencja', 'sympozjum', 'warsztaty', 'spotkanie']),
    status:       z.enum(['upcoming', 'past']),
    languages:    z.array(z.string()).optional(),
    description:  z.string().optional(),
    hasReport:    z.boolean().optional().default(false),
    reportUrl:    z.string().optional(),
    year:         z.number(),
  }),
});

export const collections = {
  multimedia: multimediaCollection,
  wydarzenia: wydarzenieCollection,
};
