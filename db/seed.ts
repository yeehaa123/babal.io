import { db, People, Socials, Courses, Checkpoints, CompletionData } from 'astro:db';
import { readDir } from "./helpers"
import type { Checkpoint, Curator } from "@/types"
import type { RawCourse } from "./prepCourses"
import { prepCourses, prepCheckpoints } from "./prepCourses"


async function prepPeople(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias }));
}

async function prepSocials(rawPeople: Curator[]) {
  return rawPeople.map(p => ({ alias: p.alias, ...p.socials }));
}

async function prepCompletionData({ people, checkpoints }: { people: { alias: string }[], checkpoints: Checkpoint[] }) {
  return people.flatMap(({ alias }) => {
    return checkpoints.flatMap(({ courseId, checkpointId }) => {
      const userName = alias;
      const rand = Math.random() < 0.4
      const completedAt = rand ? new Date : null;
      return { userName, courseId, checkpointId, completedAt };
    })
  })
}

export default async function() {
  const rawCourses = await readDir<RawCourse>('./src/content/courses');
  const rawPeople = await readDir<Curator>('./src/content/people');
  const people = await prepPeople(rawPeople);
  const socials = await prepSocials(rawPeople);
  const courses = await prepCourses(rawCourses);
  const checkpoints = await prepCheckpoints(courses);
  const completionData = await prepCompletionData({ people, checkpoints });
  await db.insert(People).values(people);
  await db.insert(Socials).values(socials);
  await db.insert(Courses).values(courses);
  await db.insert(Checkpoints).values(checkpoints);
  await db.insert(CompletionData).values(completionData);
}
