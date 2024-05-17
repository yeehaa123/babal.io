import type { CheckpointsDBResult } from "@/db/types"
import type { TempCourse } from "./prepCourses"
import { shuffle } from "./helpers"


export function prepCompletionData({ people, checkpoints }:
  { people: { alias: string }[], checkpoints: CheckpointsDBResult[] }) {
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

const messages = ["This is it!", "revise this", "Need more time to process", "There is so much to learn", "Why do you share this"];

export function prepNotesData({ people, courses }:
  { people: { alias: string }[], courses: TempCourse[] }) {
  const all = people.flatMap(({ alias }) => {
    return courses.flatMap(({ courseId }) => {
      return shuffle(messages).slice(0, 3).map((message: string) => {
        const userName = alias;
        const createdAt = new Date;
        return { userName, courseId, message, createdAt };
      })
    })
  })
  return shuffle(all).slice(0, 2);
}
