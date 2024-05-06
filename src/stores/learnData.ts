import { map } from 'nanostores'

export type LearnState = Record<string, boolean[]>

export const $learnData = map<LearnState>()

export function augmentCourses(courseIds: string[]) {
  const learnData = $learnData.get();
  for (const courseId of courseIds) {
    const entry = learnData[courseId];
    if (!entry) {
      $learnData.setKey(courseId, [true, false, true, true]);
    }
  }
}
