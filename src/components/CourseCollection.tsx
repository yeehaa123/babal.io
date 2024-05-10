import type { Course } from "@/types";
import { useEffect } from "react";
import { useOffcourseContext } from "@/containers/Offcourse";
import { useStore } from "@nanostores/react"
import CourseCardContainer from "@/components/CourseCard"
import { StoreProvider } from "@/containers/Offcourse"
import { $authState } from "@/stores/authState";

export type CollectionProps = { courses: Course[] }

function InnerCollection({ courses }: CollectionProps) {
  const authData = useStore($authState);
  const {
    missingCourses,
    fetchLearnData
  } = useOffcourseContext((state) => state);

  useEffect(() => {
    if (authData.userName) {
      fetchLearnData()
    }
  }, [authData])

  console.log(missingCourses);

  return <>
    {courses.map(({ id }) =>
      <CourseCardContainer key={id} authData={authData} courseId={id} />)}
  </>
}

export default function CourseCollection({ courses }: CollectionProps) {
  return (
    <StoreProvider courses={courses}>
      <InnerCollection courses={courses} />
    </StoreProvider>
  )
}
