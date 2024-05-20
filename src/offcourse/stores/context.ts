import type { OffcourseState } from '@/offcourse/stores/types';
import type { OffcourseStore } from "./index"
import { useStore } from 'zustand'
import { createContext, useContext } from "react"


export const OffcourseContext = createContext<OffcourseStore | null>(null)

export function useOffcourseContext<T>(selector: (state: OffcourseState) => T): T {
  const store = useContext(OffcourseContext)
  if (!store) throw new Error('Missing OffcourseContext.Provider in the tree')
  return useStore(store, selector)
}

