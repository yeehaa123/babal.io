import { db, Socials, Courses, Checkpoints, eq } from 'astro:db';
import { processCourseResults } from "./helpers"

export async function getCourseById(courseId: string) {
  const dbResult = await db.select()
    .from(Courses)
    .where(eq(Courses.id, courseId))
    .leftJoin(Socials, eq(Courses.curator, Socials.alias))
    .innerJoin(Checkpoints, eq(Courses.id, Checkpoints.courseId))

  const result = processCourseResults(dbResult);
  return result.get(courseId);
}

export async function getCourses() {
  const dbResult = await db.select()
    .from(Courses)
    .leftJoin(Socials, eq(Courses.curator, Socials.alias))
    .innerJoin(Checkpoints, eq(Courses.id, Checkpoints.courseId))

  const courseMap = processCourseResults(dbResult);
  return Array.from(courseMap, ([_, c]) => c)
}


export async function getCourseByHabitat(postId: string) {
  const index = await db.select({
    courseId: Courses.id
  }).from(Courses)
    .where(eq(Courses.habitat, postId))
  const courseId = index[0]?.courseId;

  if (!courseId) {
    return
  }
  return getCourseById(courseId)
}

