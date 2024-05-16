import CourseCollection from "@/offcourse/components/CourseCollection"
import type { Course } from "@/types";
import { CourseCard } from "./"
import type { AuthData } from "@/stores/authState";

export interface CourseCardContainer {
  course?: Course,
  courseId?: string,
  authData?: AuthData
}
export function CourseCardContainer(
  { course, courseId, authData }: CourseCardContainer) {
  if (courseId && authData) {
    return <CourseCard authData={authData} courseId={courseId} />
  }
  return course
    ? <CourseCollection standAlone={true} courses={[course]} />
    : <div>ERROR</div>
}
