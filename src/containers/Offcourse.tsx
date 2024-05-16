import { createContext, useRef } from "react"
import { useStore } from "zustand";
import { useContext } from "react";
import { createOffcourseStore } from "@/offcourse/stores/collection"

import type { ReactElement } from 'react';
import type { StoreProps, OffcourseStore, OffcourseState } from "@/offcourse/stores/collection"

interface ProviderProps extends StoreProps {
  children: ReactElement | ReactElement[]
}

export const StoreProvider = ({ children, courses }: ProviderProps) => {
  const storeRef = useRef<OffcourseStore>()
  if (!storeRef.current) {
    storeRef.current = createOffcourseStore({ courses });
  }
  return (
    <OffcourseContext.Provider value={storeRef.current}>
      {children}
    </OffcourseContext.Provider>
  )
}

export const OffcourseContext = createContext<OffcourseStore | null>(null)

export function useOffcourseContext<T>(selector: (state: OffcourseState) => T): T {
  const store = useContext(OffcourseContext)
  if (!store) throw new Error('Missing OffcourseContext.Provider in the tree')
  return useStore(store, selector)
}
