import type { Checkpoint } from "@/types"
import type { TempCourse } from "./prepCourses"
import { shuffle } from "./helpers"


export function prepCompletionData({ people, checkpoints }: { people: { alias: string }[], checkpoints: Checkpoint[] }) {
  const all = people.flatMap(({ alias }) => {
    return checkpoints.flatMap(({ courseId, checkpointId }) => {
      const userName = alias;
      const completedAt = new Date
      return { userName, courseId, checkpointId, completedAt };
    })
  })
  return shuffle(all).slice(0, 7);
}

export function prepBookmarkData({ people, courses }:
  { people: { alias: string }[], courses: TempCourse[] }) {
  const all = people.flatMap(({ alias }) => {
    return courses.flatMap(({ courseId }) => {
      const userName = alias;
      const bookmarkedAt = new Date
      return { userName, courseId, bookmarkedAt };
    })
  })
  return shuffle(all).slice(0, 2);
}
