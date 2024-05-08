import { map } from 'nanostores'
import { batched } from 'nanostores'
import { $coursesState } from './courses';
import { $authState } from './authState';

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

export const $missingLearnData = batched([$authState, $coursesState], (
  { userName }, courses) => {
  if (!userName) {
    const courseIds = Object.keys(courses);
    augmentCourses(courseIds);
  }
})


export function toggleComplete(courseId: string) {
  $learnData.setKey(courseId, [true, false, true, false]);
}
