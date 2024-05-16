import { Card } from "@/components/ui/card"
import CourseContent from "@/offcourse/components/CourseContent"
import { OverlayModes } from "@/offcourse/stores/card/types";
import { useCourseCardStore } from "@/offcourse/stores/card";
import { CourseCollection } from "@/offcourse/components/CourseCollection"
import Overlay from "@/offcourse/components/overlays";

import type { ReactNode } from "react"
import type { AuthData } from "@/stores/authState";
import type { Course } from "@/types";

type ChromeProps = {
  children: ReactNode,
}

type WrapperProps = {
  courseId: Course['courseId'],
  authData: AuthData
}

export type CardProps = {
  course?: Course | undefined,
  courseId?: string,
  authData?: AuthData
}

export function CardChrome({ children }: ChromeProps) {
  return (
    <Card className="relative max-w-[380px] min-w-[380px] select-none 
    min-h-[650px] h-full w-full flex flex-col justify-between" >
      {children}
    </Card >
  )
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

export function CourseCard({ course, courseId, authData }: CardProps) {
  if (courseId && authData) {
    return <CourseCardWrapper authData={authData} courseId={courseId} />
  }

  return course
    ? <CourseCollection standAlone={true} courses={[course]} />
    : <div>ERROR</div>
}
