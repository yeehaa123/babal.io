import { db, Socials, Courses, Checkpoints, eq } from 'astro:db';
import type {
  Course,
  CoursesDBResult,
  SocialsDBResult,
  CheckpointsDBResult
} from "@/types";

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


export async function getCourseByHabitat(postId: string) {
  const index = await db.select({
    courseId: Courses.courseId
  }).from(Courses)
    .where(eq(Courses.habitat, postId))
  const courseId = index[0]?.courseId;

  if (!courseId) {
    return
  }
  return getCourseById(courseId)
}

function processCourseResults(result: {
  Courses: CoursesDBResult,
  Socials: SocialsDBResult | null,
  Checkpoints: CheckpointsDBResult
}[]) {
  return result.reduce<Map<string, Course>>(
    (acc, row) => {
      const { courseId, curator: name, habitat, ...course } = row.Courses;
      let curator = { alias: name, socials: {} };
      const { description, ...cp } = row.Checkpoints;
      const checkpoint = {
        description: description ? description : undefined,
        ...cp
      }
      const entry = acc.get(courseId);
      if (!entry) {
        if (row.Socials) {
          let { alias, ...socials } = curator;
          curator = { alias, ...socials }
        }
        acc.set(courseId, {
          courseId,
          curator,
          ...course,
          habitat: habitat ? habitat : undefined,
          checkpoints: [checkpoint]
        })
      }
      if (entry) {
        const { ...old } = entry;
        acc.set(courseId, {
          ...old, checkpoints: [...old.checkpoints, checkpoint]
        })
      }
      return acc;
    },
    new Map()
  );
}

