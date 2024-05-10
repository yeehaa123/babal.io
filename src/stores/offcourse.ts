import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Course } from "@/types";

export interface StoreProps { courses: Course[] }


export type OffcourseStore = ReturnType<typeof createOffcourseStore>

type LearnData = {
  isBookmarked: boolean,
  tasksCompleted: boolean[]
}

type LearnDataState = Record<string, LearnData>

export type OffcourseState = {
  courses: Record<string, Course>,
  learnData: LearnDataState,
  addCourse: () => void,
  fetchMissingLearnData: () => void,
}

export function createOffcourseStore({ courses }: StoreProps) {
  return createStore<OffcourseState>()(immer(
    (set) => {
      const storeEntries = courses.map(course => {
        return [course.id, course]
      });
      return {
        courses: Object.fromEntries(storeEntries),
        learnData: {},
        addCourse: () => set((state) => {
          const courseId = Object.keys(state.courses)[0]!;
          const { ...course } = state.courses[courseId]!;
          const newId = "dfadsfljk998fdaslk";
          state.courses = { ...state.courses, [newId]: { ...course, id: newId, goal: "HURRAY" } };
          state.fetchMissingLearnData();
        }),
        fetchMissingLearnData: () => set((state) => {
          const missingCourses = Object.keys(state.courses);
          const ld = missingCourses.reduce(
            (acc: LearnDataState, courseId: Course['id'], index: number) => {
              acc[courseId] = {
                isBookmarked: !!index,
                tasksCompleted: [true, true, false, false]
              }
              return acc;
            }, {})
          state.learnData = { ...state.learnData, ...ld }
        })
      }
    }))
}
