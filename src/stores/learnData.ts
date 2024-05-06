import { map } from 'nanostores'

export type LearnState = Record<string, boolean[]>

export const $learnData = map<LearnState>()

export function augmentCourse(courseId: string) {
  $learnData.setKey(courseId, [true, false, true, true]);
}



