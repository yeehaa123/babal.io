import { db, People, Socials } from 'astro:db';
import { getCollection } from 'astro:content';

export default async function() {
  const rawPeople = await getCollection('people');
  const people = rawPeople.map(p => ({ alias: p.data.alias }));
  const socials = rawPeople.map(p => ({ alias: p.data.alias, ...p.data.socials }));

  await db.insert(People).values(people);
  await db.insert(Socials).values(socials);
}
