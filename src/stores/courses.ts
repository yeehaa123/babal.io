import type { Course } from '@/types';
import { atom } from 'nanostores';

export const $registeredCoursesState = atom<Course[]>([])

export function registerCourses(courses: Course[]) {
  const register = $registeredCoursesState.get();
  $registeredCoursesState.set([...new Set([...register, ...courses])])
}
