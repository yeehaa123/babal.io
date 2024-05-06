import { atom } from 'nanostores';

export const $registeredCoursesState = atom<string[]>([])

export function registerCourse(courseId: string) {
  const register = $registeredCoursesState.get();
  const courseIsRegistered = register.find(c => c === courseId);
  if (!courseIsRegistered) {
    registerCourses([courseId]);
  } else {
    console.log("IGNORE");
  }
}

export function registerCourses(courseIds: string[]) {
  const register = $registeredCoursesState.get();
  $registeredCoursesState.set([...new Set([...register, ...courseIds])])
}

