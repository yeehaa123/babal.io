import { map } from 'nanostores'

import type { Course } from '@/types';

type CoursesMap = Record<string, Course>
export const $coursesState = map<CoursesMap>({})
export function registerCourses(courses: Course[]) {
  let coursesMap = $coursesState.get();
  let newCourses = {};
  for (const course of courses) {
    coursesMap[course.id] = course;
  }
  $coursesState.set({ ...coursesMap, ...newCourses });
}
