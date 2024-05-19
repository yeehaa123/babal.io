import type { Course, AugmentedCourse, LearnData } from '@/offcourse/types';
import type { CardState } from '../card/types';
import { OverlayModes } from "../card/types";

import { createStore, useStore } from 'zustand'
import { createContext, useContext } from "react"
import { combine } from "zustand/middleware";
import { StoreActions } from "./actions"

export type AuthData = {
  userName: string | undefined;
}

interface StoreProps { courses: Course[] }

export type OffcourseStore = ReturnType<typeof createOffcourseStore>


type LearnDataState = Record<string, LearnData>

export type OffcourseState = {
  cardStates: Record<string, CardState>
  authData: AuthData,
  courses: Record<string, AugmentedCourse>,
  learnData: LearnDataState,
  actions: StoreActions
}

export function createOffcourseStore({ courses }: StoreProps) {
  const storeEntries = courses.map(course => {
    return [course.courseId, course]
  });

  const cardEntries = courses.map(course => {
    return [course.courseId, {
      overlayMode: OverlayModes.NONE,
      selectedCheckpoint: undefined,
      isMetaVisible: false,
    },
    ]
  })

  const initialState = {
    cardStates: Object.fromEntries(cardEntries),
    authData: { userName: undefined },
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
