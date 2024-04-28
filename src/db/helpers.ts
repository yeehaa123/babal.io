import type {
  Course,
  CoursesDBResult,
  SocialsDBResult,
  CheckpointsDBResult
} from "@/types";

export function processCourseResults(result: {
  Courses: CoursesDBResult,
  Socials: SocialsDBResult | null,
  Checkpoints: CheckpointsDBResult
}[]) {
  return result.reduce<Map<string, Course>>(
    (acc, row) => {
      const { goal, curator: name, habitat, ...course } = row.Courses;
      let curator = { alias: name, socials: {} };
      const entry = acc.get(goal);
      if (!entry) {
        if (row.Socials) {
          let { alias, ...socials } = curator;
          curator = { alias, ...socials }
        }
        acc.set(goal, {
          goal,
          curator,
          ...course,
          habitat: habitat ? habitat : undefined,
          checkpoints: [row.Checkpoints]
        })
      }
      if (entry) {
        const { ...old } = entry;
        acc.set(goal, {
          ...old, checkpoints: [...old.checkpoints, row.Checkpoints]
        })
      }
      return acc;
    },
    new Map()
  );
}

