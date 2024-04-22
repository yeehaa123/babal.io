import type { CollectionEntry } from 'astro:content';
import { db, Socials, Courses, Checkpoints, eq } from 'astro:db';
import type {
  CoursesResult,
  SocialsResult,
  CheckpointsResult
} from "@/types";

type Course = CollectionEntry<'courses'>['data'] | undefined
type Curator = CollectionEntry<'people'>['data'] | undefined

export function processCourseResults(result: {
  Courses: CoursesResult,
  Socials: SocialsResult | null,
  Checkpoints: CheckpointsResult
}[]) {
  return result.reduce<Map<string, { course: Course, curator: Curator | undefined }>>(
    (acc, row) => {
      const { id, habitat, ...course } = row.Courses;
      let curator;
      const entry = acc.get(id);
      if (!entry) {
        if (row.Socials) {
          const { alias, ...socials } = row.Socials;
          curator = { alias: alias || row.Courses.curator, socials }
        }
        acc.set(id, {
          curator,
          course: {
            ...course,
            habitat: habitat ? habitat : undefined,
            checkpoints: [row.Checkpoints]
          }
        })
      }
      if (entry && entry.course) {
        const { course, ...old } = entry;
        acc.set(id, {
          ...old,
          course: { ...course, checkpoints: [...course.checkpoints, row.Checkpoints] }
        })
      }
      return acc;
    },
    new Map()
  );
}

export async function getCourseById(courseId: string) {
  const dbResult = await db.select()
    .from(Courses)
    .where(eq(Courses.id, courseId))
    .leftJoin(Socials, eq(Courses.curator, Socials.alias))
    .innerJoin(Checkpoints, eq(Courses.id, Checkpoints.courseId))

  const result = processCourseResults(dbResult);
  const course = result.get(courseId);

  if (!course) {
    return { course: undefined, curator: undefined }
  }
  return course;
}

export async function getCourseByHabitat(postId: string) {
  const index = await db.select({
    courseId: Courses.id
  }).from(Courses)
    .where(eq(Courses.habitat, postId))
  const courseId = index[0]?.courseId;
  if (!courseId) {
    return { course: undefined, curator: undefined }
  }
  return getCourseById(courseId)
}

