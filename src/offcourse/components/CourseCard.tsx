import type { Course } from "@/offcourse/types";

import { CourseContent, CourseCollection, Overlay } from "@/offcourse/components"
import { useCourseCardStore } from "@/offcourse/stores/card";

type WrapperProps = {
  courseId: Course['courseId'],
}

export type CardProps = {
  course?: Course | undefined,
  courseId?: string,
}


export function CourseCardWrapper({ courseId }: WrapperProps) {
  const store = useCourseCardStore({ courseId });

  if (!store) {
    return <div>ERROR</div>
  }

  return (
    <div className="grid *:col-start-1 *:row-start-1" >
      <Overlay {...store} />
      <CourseContent {...store} />
    </div >)
}

export default function CourseCard({ course, courseId }: CardProps) {
  if (courseId) {
    return <CourseCardWrapper courseId={courseId} />
  }

  return course
    ? <CourseCollection standAlone={true} courses={[course]} />
    : <div>ERROR</div>
}
