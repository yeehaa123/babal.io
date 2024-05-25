import type { LearnRecord } from "../models/LearnRecord"
import type { Checkpoint, Curator, Tag } from "../types";

export type Course = {
  courseId: string,
  goal: string,
  description: string,
  curator: Curator,
  habitat?: string | undefined,
  checkpoints: Checkpoint[],
  tags: Tag[]
}

export function augment({ course, learnRecord }:
  { course: Course, learnRecord: LearnRecord }) {
  return {
    ...course, checkpoints: course.checkpoints.map((cp) => {
      const isCompleted = learnRecord?.tasksCompleted[cp.checkpointId];
      return {
        ...cp,
        isCompleted
      }
    }).sort(({ order }) => order),
    isBookmarked: learnRecord?.isBookmarked,
    notes: learnRecord?.notes || []
  }
}

export function clone(course: Course, userName: string) {
  const newId = "dfadsfljk998fdaslk";
  const curator = { alias: userName, socials: {} }
  const checkpoints = course.checkpoints.map(cp => { return { ...cp, courseId: newId } });
  return { ...course, curator, courseId: newId, checkpoints, goal: "HURRAY" }

}
