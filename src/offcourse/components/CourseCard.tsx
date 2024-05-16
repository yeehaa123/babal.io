import { Card } from "@/components/ui/card"
import CourseContent from "@/offcourse/components/CourseContent"
import { OverlayModes } from "@/offcourse/stores/card/types";
import { useCourseCardStore } from "@/offcourse/stores/card";
import Overlay from "@/offcourse/components/overlays";

import type { ReactNode } from "react"
import type { AuthData } from "@/stores/authState";
import type { Course } from "@/types";

type ChromeProps = {
  children: ReactNode,
}

export function CardChrome({ children }: ChromeProps) {
  return (
    <Card className="relative max-w-[380px] min-w-[380px] select-none 
    min-h-[650px] h-full w-full flex flex-col justify-between" >
      {children}
    </Card >)
}

type CardProps = {
  courseId: Course['courseId'],
  authData: AuthData
}

export function CourseCard({ courseId, authData }: CardProps) {
  const store = useCourseCardStore({ courseId, authData });

  if (!store) {
    return <div>ERROR</div>
  }

  return store.cardState.overlayMode === OverlayModes.NONE
    ? <CourseContent {...store} />
    : <Overlay {...store} />
}
