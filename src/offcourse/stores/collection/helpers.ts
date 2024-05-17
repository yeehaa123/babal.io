import type { LearnData, Course } from "@/offcourse/types";

export function prepareCourse(
  { course, learnData }:
    { course: Course, learnData: LearnData | undefined }) {
  return {
    ...course, checkpoints: course.checkpoints.map((cp, index) => ({
      ...cp,
      isCompleted: learnData?.tasksCompleted[index]
    })),
    isBookmarked: learnData?.isBookmarked,
    notes: learnData?.notes || []
  }
}
