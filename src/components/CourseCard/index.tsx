import type { Course } from "@/types";
import { Card } from "@/components/ui/card"
import { initiate } from "./stores/index";
import { useStore } from '@nanostores/react';
import CourseContent from "./CourseContent";
import Overlay from "./overlays"

import { OverlayModes } from "./types";

export type CourseCardState = {
  overlayMode: OverlayModes | undefined,
  course: Course,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

export default function CourseCard(course: Course) {
  const courseCardState = initiate(course);
  const {
    affordances,
    overlay,
    actions,
    isMetaVisible,
    isBookmarked,
  } = useStore(courseCardState);
  return <Card
    className="relative w-auto max-w-[380px] select-none 
    min-h-[500px] h-full w-full flex flex-col justify-between">
    {overlay ?
      <Overlay {...overlay} />
      : <CourseContent
        isBookmarked={isBookmarked}
        isMetaVisible={isMetaVisible}
        course={course}
        affordances={affordances}
        actions={actions} />
    }
  </Card >
}

