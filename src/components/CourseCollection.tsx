import type { Course } from "@/types";

import CourseCard from "@/components/CourseCard"
import { useOffcourse } from "@/containers/Offcourse"

export type CollectionProps = { courses: Course[] }

export default function CourseCollection({ courses }: CollectionProps) {
  const stores = useOffcourse(courses);
  return (
    <>{stores.map((store, index) => <CourseCard key={index} store={store} />)}</>
  )
}
