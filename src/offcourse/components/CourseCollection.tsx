import type { Course } from "@/offcourse/types";
import type { ReactElement } from 'react';
import type { OffcourseStore } from "@/offcourse/stores/collection"
import { useRef } from "react"
import { useShallow } from 'zustand/react/shallow'
import { OffcourseContext, useOffcourseContext } from "@/offcourse/stores/collection";
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
  const courseIds = useOffcourseContext(
    useShallow((state) => Object.keys(state.courses)))
  return (
    <div
      className="grid justify-center items-start gap-4 gap-y-8 m-2 grid-cols-[repeat(auto-fit,minmax(340px,400px))]">
      {courseIds.map((id) =>
        <CourseCard key={id} courseId={id} />)}
    </div>)
}

export default function CourseCollection({ courses }: CollectionProps) {
  return (
    <StoreProvider courses={courses}>
      <InnerCollection />
    </StoreProvider>
  )
}
