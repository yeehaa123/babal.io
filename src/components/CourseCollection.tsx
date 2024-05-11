import type { Course } from "@/types";
import { useEffect } from "react";
import { useShallow } from 'zustand/react/shallow'

import { useOffcourseContext } from "@/containers/Offcourse";
import { useStore } from "@nanostores/react"
import CourseCardContainer from "@/components/CourseCard"
import { StoreProvider } from "@/containers/Offcourse"
import { $authState } from "@/stores/authState";

export type CollectionProps = { courses: Course[], standAlone?: boolean }

function InnerCollection() {
  const authData = useStore($authState);
  const {
    fetchMissingLearnData,
  } = useOffcourseContext((state) => state.actions);
  const courseIds = useOffcourseContext(useShallow((state) => Object.keys(state.courses)))

  useEffect(() => {
    if (authData.userName) {
      fetchMissingLearnData()
    }
  }, [authData, courseIds])


  return <>
    {courseIds.map((id) =>
      <CourseCardContainer key={id} authData={authData} courseId={id} />)}
  </>
}

export default function CourseCollection({ courses }: CollectionProps) {
  return (
    <StoreProvider courses={courses}>
      <InnerCollection />
    </StoreProvider>
  )
}
