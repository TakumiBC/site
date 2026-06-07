import { defineCollection, z } from 'astro:content';

const post = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    dateFormatted: z.string().optional(),
    tags: z.union([z.array(z.string()), z.string()]).optional(),
    permalink: z.string().optional()
  }).passthrough()
});

export const collections = { post };
