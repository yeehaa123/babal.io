import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Course } from "@/types";

export interface StoreProps { courses: Course[] }


export type OffcourseStore = ReturnType<typeof createOffcourseStore>

export type OffcourseState = {
  courses: Record<string, Course>,
  missingCourses: string[],
  fetchLearnData: () => void,
}

export function createOffcourseStore({ courses }: StoreProps) {
  return createStore<OffcourseState>()(immer(
    (set) => {
      const storeEntries = courses.map(course => {
        return [course.id, course]
      });
      return {
        courses: Object.fromEntries(storeEntries),
        missingCourses: [],
        fetchLearnData: () => set((state) => { state.missingCourses = Object.keys(state.courses) }),
      }
    }))
}
