import { defineCollection, z } from 'astro:content';

const courses = defineCollection({
  type: 'data',
  schema: z.object({
    goal: z.string(),
    curator: z.string(),
    description: z.string(),
    checkpoints: z.array(z.object({
      task: z.string(),
      href: z.string()
    }))
  }),
});

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    course: z.string(),
    stakeholders: z.array(z.string())
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    published_on: z.coerce.date(),
  }),
});

export const collections = { cases, blog, courses };
