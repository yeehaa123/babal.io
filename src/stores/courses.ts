import type { Course } from '@/types';
import { atom } from 'nanostores';

export const $registeredCoursesState = atom<string[]>([])

export function registerCourse(course: Course) {
  const courseId = course.goal;
  const register = $registeredCoursesState.get();
  const courseIsRegistered = register.find(c => c === courseId);
  if (!courseIsRegistered) {
    registerCourses([course]);
  } else {
    console.log("IGNORE");
  }
}

export function registerCourses(courses: Course[]) {
  const courseIds = courses.map(c => c.goal);
  const register = $registeredCoursesState.get();
  $registeredCoursesState.set([...new Set([...register, ...courseIds])])
}

