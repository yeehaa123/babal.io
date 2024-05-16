import type { Course } from "@/types";
import type { AugmentedCourse, LearnData } from '@/offcourse/types';

import { createStore, useStore } from 'zustand'
import { createContext, useContext } from "react"
import { combine } from "zustand/middleware";
import { StoreActions } from "./actions"

interface StoreProps { courses: Course[] }

export type OffcourseStore = ReturnType<typeof createOffcourseStore>


type LearnDataState = Record<string, LearnData>

export type OffcourseState = {
  courses: Record<string, AugmentedCourse>,
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

export function useOffcourseContext<T>(selector: (state: OffcourseState) => T): T {
  const store = useContext(OffcourseContext)
  if (!store) throw new Error('Missing OffcourseContext.Provider in the tree')
  return useStore(store, selector)
}

export const OffcourseContext = createContext<OffcourseStore | null>(null)
