import type { Course } from "@/types";
import { useEffect } from "react";
import { useOffcourseContext } from "@/containers/Offcourse";
import { useStore } from "@nanostores/react"
import CourseCardContainer from "@/components/CourseCard"
import { StoreProvider } from "@/containers/Offcourse"
import { $authState, login } from "@/stores/authState";
import { Button } from "./ui/button";

export type CollectionProps = { courses: Course[], standAlone?: boolean }

function InnerCollection({ standAlone = false }: { standAlone: boolean | undefined }) {
  const authData = useStore($authState);
  const {
    courses,
    fetchMissingLearnData,
    addCourse,
  } = useOffcourseContext((state) => state);

  const courseIds = Object.keys(courses);

  useEffect(() => {
    if (authData.userName) {
      fetchMissingLearnData()
    }
  }, [authData, courses])


  return <div className="flex flex-col items-center">
    <div className="flex gap-4">
      {courseIds.map((id) =>
        <CourseCardContainer key={id} authData={authData} courseId={id} />)}
    </div>
    {!standAlone && <div className="flex gap-4 mt-8">
      <Button className="w-[150px]" onClick={login}>Sign In</Button>
      <Button className="w-[150px]" onClick={addCourse}>Add Course</Button>
    </div>}
  </div >
}

export default function CourseCollection({ courses, standAlone }: CollectionProps) {
  return (
    <StoreProvider courses={courses}>
      <InnerCollection standAlone={standAlone} />
    </StoreProvider>
  )
}
