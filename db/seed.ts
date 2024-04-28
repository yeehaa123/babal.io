import { db, People, Socials, Courses, Checkpoints } from 'astro:db';
import { readDir } from "./helpers"
import type { RawCourse, Curator, } from "@/types"

async function prepPeople(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias }));
}

async function prepSocials(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias, ...p.socials }));
}

async function prepCourses(courses: RawCourse[]) {
  return courses.map((course) => {
    const { habitat, ...rest } = course;
    return { habitat: habitat || null, ...rest }
  });
}

async function prepCheckpoints(courses: RawCourse[]) {
  return courses.flatMap(({ goal, checkpoints }) => {
    return checkpoints.map((checkpoint) => {
      return { goal, ...checkpoint }
    })
  })
}

export default async function() {
  const rawCourses = await readDir<RawCourse>('./src/content/courses');
  const rawPeople = await readDir<Curator>('./src/content/people');
  const people = await prepPeople(rawPeople);
  const socials = await prepSocials(rawPeople);
  const courses = await prepCourses(rawCourses);
  const checkpoints = await prepCheckpoints(rawCourses);
  await db.insert(People).values(people);
  await db.insert(Socials).values(socials);
  await db.insert(Courses).values(courses);
  await db.insert(Checkpoints).values(checkpoints);
}
