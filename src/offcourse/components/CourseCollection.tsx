import type { Course } from "@/offcourse/types";
import type { ReactElement } from 'react';
import type { OffcourseStore } from "@/offcourse/stores/collection"

import { useEffect, useRef } from "react"
import { useShallow } from 'zustand/react/shallow'
import { useStore } from "@nanostores/react"

import { OffcourseContext, useOffcourseContext } from "@/offcourse/stores/collection";
import { $authState } from "@/stores/authState";
import { createOffcourseStore } from "@/offcourse/stores/collection"
import { CourseCard } from "."


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

export default function CourseCollection({ courses }: CollectionProps) {
  return (
    <StoreProvider courses={courses}>
      <InnerCollection />
    </StoreProvider>
  )
}
