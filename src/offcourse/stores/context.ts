import type {
  AuthData,
  AugmentedCourse,
  LearnData,
  CardState
} from '@/offcourse/types';

import { useStore } from 'zustand'
import { createContext, useContext } from "react"
import { StoreActions } from "./actions"
import type { OffcourseStore } from "./index"


export const OffcourseContext = createContext<OffcourseStore | null>(null)

type LearnDataState = Record<string, LearnData>

export type OffcourseState = {
  cardStates: Record<string, CardState>
  authData: AuthData,
  courses: Record<string, AugmentedCourse>,
  learnData: LearnDataState,
  actions: StoreActions
}

export function useOffcourseContext<T>(selector: (state: OffcourseState) => T): T {
  const store = useContext(OffcourseContext)
  if (!store) throw new Error('Missing OffcourseContext.Provider in the tree')
  return useStore(store, selector)
}

