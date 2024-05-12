import type { Course } from "@/types";
import type { LearnData } from "@/stores/offcourse";


export function prepareCourse(
  { course, learnData }:
    { course: Course, learnData: LearnData | undefined }) {
  return {
    ...course, checkpoints: course.checkpoints.map((cp, index) => ({
      ...cp,
      isCompleted: learnData?.tasksCompleted[index]
    })),
    isBookmarked: learnData?.isBookmarked
  }
}
