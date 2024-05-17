import { CourseContent, CourseCollection, Overlay } from "@/offcourse/components"
import { OverlayModes } from "@/offcourse/stores/card/types";
import { useCourseCardStore } from "@/offcourse/stores/card";

import type { AuthData } from "@/stores/authState";
import type { Course } from "@/types";

type WrapperProps = {
  courseId: Course['courseId'],
  authData: AuthData
}

export type CardProps = {
  course?: Course | undefined,
  courseId?: string,
  authData?: AuthData
}


export function CourseCardWrapper({ courseId, authData }: WrapperProps) {
  const store = useCourseCardStore({ courseId, authData });

  if (!store) {
    return <div>ERROR</div>
  }

  return store.cardState.overlayMode === OverlayModes.NONE
    ? <CourseContent {...store} />
    : <Overlay {...store} />
}

export default function CourseCard({ course, courseId, authData }: CardProps) {
  if (courseId && authData) {
    return <CourseCardWrapper authData={authData} courseId={courseId} />
  }

  return course
    ? <CourseCollection standAlone={true} courses={[course]} />
    : <div>ERROR</div>
}
