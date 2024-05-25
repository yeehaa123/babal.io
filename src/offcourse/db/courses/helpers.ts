import type { Course } from "@/offcourse/types";

import type {
  CoursesDBResult,
  SocialsDBResult,
  CheckpointsDBResult
} from "../types";

export function processCourseResults(result: {
  Courses: CoursesDBResult,
  Socials: SocialsDBResult | null,
  Checkpoints: CheckpointsDBResult
}[]) {
  return result.reduce<Map<string, Course>>(
    (acc, row) => {
      const { courseId, curator: name, habitat, ...course } = row.Courses;
      const entry = acc.get(courseId);
      let curator = { alias: name, socials: {} };
      const { description, tags, ...rawCheckpoint } = row.Checkpoints;

      const checkpoint = {
        ...rawCheckpoint,
        tags: tags?.split(",").map(t => t.trim()) || [],
        description: description ? description : undefined
      }

      if (!entry) {
        if (row.Socials) {
          let { alias, ...socials } = curator;
          curator = { alias, ...socials }
        }

        acc.set(courseId, {
          ...course,
          courseId,
          curator,
          tags: [...checkpoint.tags],
          habitat: habitat ? habitat : undefined,
          checkpoints: [checkpoint]
        })

      } else {
        const { tags, checkpoints } = entry;

        acc.set(courseId, {
          ...entry,
          tags: [...new Set([...tags, ...checkpoint.tags])],
          checkpoints: [...checkpoints, checkpoint]
        })
      }
      return acc;
    },
    new Map()
  );
}
