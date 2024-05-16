import type { Course } from "@/types";
import { useEffect, useRef } from "react"
import { useShallow } from 'zustand/react/shallow'

import { OffcourseContext, useOffcourseContext } from "@/offcourse/stores/collection";
import { useStore } from "@nanostores/react"
import { CourseCard } from "@/offcourse/components/CourseCard"
import { $authState } from "@/stores/authState";
import { createOffcourseStore } from "@/offcourse/stores/collection"

import type { ReactElement } from 'react';
import type { OffcourseStore } from "@/offcourse/stores/collection"

type CollectionProps = {
  courses: Course[],
  standAlone?: boolean
}

interface ProviderProps {
  courses: Course[],
  children: ReactElement | ReactElement[]
}

const StoreProvider = ({ children, courses }: ProviderProps) => {
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

function InnerCollection() {
  const authData = useStore($authState);
  const {
    fetchMissingLearnData,
  } = useOffcourseContext((state) => state.actions);

  const courseIds = useOffcourseContext(
    useShallow((state) => Object.keys(state.courses)))

  useEffect(() => {
    authData.userName && fetchMissingLearnData(authData)
  }, [authData, courseIds])


  return <>
    {courseIds.map((id) =>
      <CourseCard key={id} authData={authData} courseId={id} />)}
  </>
}

export function CourseCollection({ courses }: CollectionProps) {
  return (
    <StoreProvider courses={courses}>
      <InnerCollection />
    </StoreProvider>
  )
}
