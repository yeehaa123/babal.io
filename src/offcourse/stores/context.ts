import type { AuthData, AugmentedCourse, LearnData } from '@/offcourse/types';
import { StoreActions } from "./actions"

import type { CardState } from './card/types';
import { useStore } from 'zustand'
import { createContext, useContext } from "react"
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

