import { defineCollection, z } from 'astro:content';

const partSchema = z.object({
  id: z.string(),
  label: z.string(),
  duration: z.string(),
  description: z.string().optional(),
});

const multimediaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    dateSortable: z.string().optional(),
    place: z.string().optional(),
    category: z.enum(['wyklad', 'seminarium', 'konferencja', 'inne']),
    tags: z.array(z.string()).optional(),
    description: z.string(),
    parts: z.array(partSchema),
    year: z.number(),
  }),
});

export const collections = {
  multimedia: multimediaCollection,
};
