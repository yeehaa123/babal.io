import { db, People, Socials, Courses, Checkpoints } from 'astro:db';
import { nanoid } from 'nanoid'
import { readDir } from "./helpers"
import type { Curator, Checkpoint, } from "@/types"

export interface RawCourse {
  goal: string,
  description: string,
  curator: string,
  habitat?: string | undefined,
  checkpoints: {
    task: string,
    href: string,
  }[]
}

interface TempCourse extends Omit<RawCourse, "habitat"> {
  id: string
  habitat: string | null,
}

async function getDescription(cp: Checkpoint) {
  const description = "The 80,000 Hours article details a method to identify personal strengths for career advancement. It encourages developing new skills beyond existing strengths. The method involves analyzing personal experiences, reflective questioning, and consulting established strength lists. Emphasis is placed on the importance of feedback and self-reflection for effectively identifying and using personal strengths."
  return { ...cp, description }
}

async function prepPeople(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias }));
}

async function prepSocials(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias, ...p.socials }));
}

async function prepCourses(courses: RawCourse[]): Promise<TempCourse[]> {
  return courses.map((course) => {
    const id = nanoid();
    const { habitat, ...rest } = course;
    return { id, habitat: habitat || null, ...rest }
  });
}

async function prepCheckpoints(courses: TempCourse[]) {
  const flatCheckpoints = courses.flatMap(({ id, checkpoints }) => {
    return checkpoints.map((checkpoint) => {
      const courseId = id;
      return { courseId, ...checkpoint }
    })
  })
  const promises = flatCheckpoints.map(getDescription);
  return Promise.all(promises);
}

export default async function() {
  const rawCourses = await readDir<RawCourse>('./src/content/courses');
  const rawPeople = await readDir<Curator>('./src/content/people');
  const people = await prepPeople(rawPeople);
  const socials = await prepSocials(rawPeople);
  const courses = await prepCourses(rawCourses);
  const checkpoints = await prepCheckpoints(courses);
  await db.insert(People).values(people);
  await db.insert(Socials).values(socials);
  await db.insert(Courses).values(courses);
  await db.insert(Checkpoints).values(checkpoints);
}
