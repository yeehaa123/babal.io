import type { Course } from "@/types";

import { CollectionContainer } from "@/containers/Offcourse"
import CourseCard from "@/components/CourseCard"

export type CollectionProps = { courses: Course[] }


export default function CourseCollection({ courses }: CollectionProps) {
  return (
    <CollectionContainer courses={courses}>
      <CourseCard />
    </CollectionContainer>
  )
}
