import { db, Tags } from 'astro:db';

export async function getTags() {
  const dbResult = await db.select()
    .from(Tags)

  const allTags = dbResult.map(({ tag }) => tag);
  const tags = new Set([...allTags]);
  return [...tags]
}
