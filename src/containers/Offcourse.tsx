import type { ReactElement } from 'react';
import { createContext, useRef } from "react"
import { createOffcourseStore } from "@/stores/offcourse"
import type { CoreState, CourseCardStore, StoreProps, OffcourseStore, Affordances } from "@/stores/offcourse"

interface ProviderProps extends StoreProps {
  children: ReactElement
}

export const StoreProvider = ({ children, courses, authData }: ProviderProps) => {
  const storeRef = useRef<OffcourseStore>()
  if (!storeRef.current) {
    storeRef.current = createOffcourseStore({ courses, authData });
  }
  return (
    <OffcourseContext.Provider value={storeRef.current}>
      {children}
    </OffcourseContext.Provider>
  )
}

export const OffcourseContext = createContext<OffcourseStore | null>(null)

export type { CoreState, CourseCardStore, Affordances }
