import type { Course } from "@/types";
import { useStore as useNano } from "@nanostores/react";

import CourseCardContainer from "@/components/CourseCard"
import { StoreProvider } from "@/containers/Offcourse"
import { $authState } from "@/stores/authState";

export type CollectionProps = { courses: Course[] }

export default function CourseCollection({ courses }: CollectionProps) {
  const authData = useNano($authState);
  return (
    <StoreProvider courses={courses} authData={authData}>
      {courses.map(({ id }) => <CourseCardContainer key={id} courseId={id} />)}
    </StoreProvider>
  )
}
