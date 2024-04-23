import { db, People, Socials, Courses, Checkpoints } from 'astro:db';
import { getCollection } from 'astro:content';
import crypto from 'crypto'


async function prepPeople() {
  const rawPeople = await getCollection('people');
  const people = rawPeople.map(p => ({ alias: p.data.alias }));
  const socials = rawPeople.map(p => ({ alias: p.data.alias, ...p.data.socials }));
  return { people, socials }
}


async function prepCourses() {
  const rawCourses = await getCollection('courses');
  const courses = rawCourses
    .map(({ data }) => {
      const id = crypto.randomUUID();
      const { habitat, ...rest } = data;
      return { id, habitat: habitat || null, ...rest }
    });

  const checkpoints = courses
    .flatMap(({ id, checkpoints }) => {
      return checkpoints.flatMap(checkpoint => {
        return { courseId: id, ...checkpoint }
      })
    })
  return { courses, checkpoints }
}

export default async function() {
  const { people, socials } = await prepPeople();
  const { courses, checkpoints } = await prepCourses();

  await db.insert(People).values(people);
  await db.insert(Socials).values(socials);
  await db.insert(Courses).values(courses);
  await db.insert(Checkpoints).values(checkpoints);
}
