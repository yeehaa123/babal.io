import { createStore } from 'zustand'
import type { Course } from "@/types";
import { combine } from "zustand/middleware";
import { StoreActions } from "./actions"

export interface StoreProps { courses: Course[] }

export type OffcourseStore = ReturnType<typeof createOffcourseStore>

export type LearnData = {
  isBookmarked: boolean,
  tasksCompleted: boolean[]
}

type LearnDataState = Record<string, LearnData>

export type OffcourseState = {
  courses: Record<string, Course>,
  learnData: LearnDataState,
  actions: StoreActions
}

export function createOffcourseStore({ courses }: StoreProps) {
  const storeEntries = courses.map(course => {
    return [course.courseId, course]
  });

  const initialState = {
    courses: Object.fromEntries(storeEntries),
    learnData: {}
  }
  return createStore(
    combine(initialState, (set, get) => ({ actions: new StoreActions(set, get) }))
  )
}

