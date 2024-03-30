import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    published_on: z.coerce.date(),
  }),
});

export const collections = { blog };
