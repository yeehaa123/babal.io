import type { LearnData, Course } from "@/offcourse/types";

export function prepareCourse(
  { course, learnData }:
    { course: Course, learnData: LearnData | undefined }) {
  return {
    ...course, checkpoints: course.checkpoints.map((cp) => {
      const isCompleted = learnData &&
        new Set([...learnData.tasksCompleted]).has(cp.checkpointId);
      return {
        ...cp,
        isCompleted
      }
    }),
    isBookmarked: learnData?.isBookmarked,
    notes: learnData?.notes || []
  }
}
