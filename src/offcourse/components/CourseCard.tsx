import type { Course } from "@/offcourse/types";

import { CourseContent, CourseCollection, Overlay } from "@/offcourse/components"
import { OverlayModes } from "@/offcourse/stores/card/types";
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

  return store.cardState.overlayMode === OverlayModes.NONE
    ? <CourseContent {...store} />
    : <Overlay {...store} />
}

export default function CourseCard({ course, courseId }: CardProps) {
  if (courseId) {
    return <CourseCardWrapper courseId={courseId} />
  }

  return course
    ? <CourseCollection standAlone={true} courses={[course]} />
    : <div>ERROR</div>
}
