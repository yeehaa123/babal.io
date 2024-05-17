import { db, Socials, Courses, Checkpoints, Tags, eq } from 'astro:db';
import { processCourseResults } from "./helpers"

export async function getCourseById(courseId: string) {
  const dbResult = await db.select()
    .from(Courses)
    .where(eq(Courses.courseId, courseId))
    .leftJoin(Socials, eq(Courses.curator, Socials.alias))
    .innerJoin(Checkpoints, eq(Courses.courseId, Checkpoints.courseId))

  const result = processCourseResults(dbResult);
  return result.get(courseId);
}

export async function getCourses() {
  const dbResult = await db.select()
    .from(Courses)
    .leftJoin(Socials, eq(Courses.curator, Socials.alias))
    .innerJoin(Checkpoints, eq(Courses.courseId, Checkpoints.courseId))

  const courseMap = processCourseResults(dbResult);
  return Array.from(courseMap, ([_, c]) => c)
}

export async function getCoursesByCurator(curator: string) {
  const dbResult = await db.select()
    .from(Courses)
    .where(eq(Courses.curator, curator))
    .leftJoin(Socials, eq(Courses.curator, Socials.alias))
    .innerJoin(Checkpoints, eq(Courses.courseId, Checkpoints.courseId))

  const courseMap = processCourseResults(dbResult);
  return Array.from(courseMap, ([_, c]) => c)
}

export async function getCoursesByTag(tag: string) {
  const dbResult = await db.select()
    .from(Tags)
    .where(eq(Tags.tag, tag))
    .innerJoin(Courses, eq(Courses.courseId, Tags.courseId))
    .leftJoin(Socials, eq(Courses.curator, Socials.alias))
    .innerJoin(Checkpoints, eq(Courses.courseId, Checkpoints.courseId))

  const courseMap = processCourseResults(dbResult);
  return Array.from(courseMap, ([_, c]) => c)
}

export async function getTags() {
  const dbResult = await db.select()
    .from(Tags)

  const allTags = dbResult.map(({ tag }) => tag);
  const tags = new Set([...allTags]);
  return [...tags]
}


export async function getCourseByHabitat(postId: string) {
  const index = await db.select({
    courseId: Courses.courseId
  }).from(Courses)
    .where(eq(Courses.habitat, postId))

  const courseId = index[0]?.courseId;

  if (!courseId) { return }

  return getCourseById(courseId)
}

