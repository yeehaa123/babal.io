import type { ReactElement } from 'react';
import { createContext, useRef } from "react"
import { createOffcourseStore } from "@/stores/offcourse"
import type { StoreProps, OffcourseStore } from "@/stores/offcourse"
import { useStore } from "zustand";
import type { OffcourseState } from "@/stores/offcourse";
import { useContext } from "react";

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
