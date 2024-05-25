import { OverlayModes } from "@/offcourse/types"
import type { Course, CourseQuery } from "@/offcourse/types"

export type CardState = {
  courseId: Course['courseId'],
  overlayMode: OverlayModes,
  selectedCheckpoint: string | undefined,
  isMetaVisible: boolean
}

export function initCardState({ courseId }: CourseQuery) {
  return {
    courseId,
    overlayMode: OverlayModes.NONE,
    selectedCheckpoint: undefined,
    isMetaVisible: false,
  }
}
