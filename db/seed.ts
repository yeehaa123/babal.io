import { db, People, Socials, Courses, Checkpoints } from 'astro:db';
import { readDir } from "./helpers"
import type { Curator, CheckpointsResult, CoursesResult } from "@/types"

export type RawCourse = {
  goal: string,
  description: string,
  curator: string,
  habitat?: string | undefined,
  checkpoints: {
    task: string,
    href: string
  }[]
}
async function prepPeople() {
  const rawPeople = await readDir<Curator>('./src/content/people');
  const people = rawPeople.map(p => ({ alias: p.alias }));
  const socials = rawPeople.map(p => ({ alias: p.alias, ...p.socials }));
  return { people, socials }
}

async function prepCourses(courses: RawCourse[]): Promise<CoursesResult[]> {
  return courses.map((course) => {
    const { habitat, checkpoints, ...rest } = course;
    return { habitat: habitat || null, ...rest }
  });
}

async function prepCheckpoints(courses: RawCourse[]): Promise<CheckpointsResult[]> {
  return courses.flatMap(({ goal, checkpoints }) => {
    return checkpoints.map((checkpoint) => {
      return { goal, ...checkpoint }
    })
  })
}
//
//
export default async function() {
  const { people, socials } = await prepPeople();
  const rawCourses = await readDir<RawCourse>('./src/content/courses');
  const courses = await prepCourses(rawCourses);
  const checkpoints = await prepCheckpoints(rawCourses);
  await db.insert(People).values(people);
  await db.insert(Socials).values(socials);
  await db.insert(Courses).values(courses);
  await db.insert(Checkpoints).values(checkpoints);
}
