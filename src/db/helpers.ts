import type {
  Course,
  CoursesResult,
  SocialsResult,
  CheckpointsResult
} from "@/types";

export function processCourseResults(result: {
  Courses: CoursesResult,
  Socials: SocialsResult | null,
  Checkpoints: CheckpointsResult
}[]) {
  return result.reduce<Map<string, Course>>(
    (acc, row) => {
      const { id, curator: name, habitat, ...course } = row.Courses;
      let curator = { alias: name, socials: {} };
      const entry = acc.get(id);
      if (!entry) {
        if (row.Socials) {
          let { alias, ...socials } = curator;
          curator = { alias, ...socials }
        }
        acc.set(id, {
          id,
          curator,
          ...course,
          habitat: habitat ? habitat : undefined,
          checkpoints: [row.Checkpoints]
        })
      }
      if (entry) {
        const { ...old } = entry;
        acc.set(id, {
          ...old, checkpoints: [...old.checkpoints, row.Checkpoints]
        })
      }
      return acc;
    },
    new Map()
  );
}

