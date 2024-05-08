import type { Course } from "@/types";
import CourseContent from "./CourseContent";
import type { CourseCardStore } from "@/containers/Offcourse"
import Overlay, { OverlayModes } from "./overlays";
import CourseCollection from "@/components/CourseCollection"

export interface CourseCard extends CourseCardStore {
  actions: any;
}



export interface CourseCardContainer {
  store?: CourseCard,
  actions?: any;
  course?: Course,
}

export default function CourseCard(
  { course, store, }: CourseCardContainer) {
  if (store) {
    return store.cardState.overlayMode === OverlayModes.NONE
      ? <CourseContent {...store} />
      : <Overlay {...store} />
  }
  return course
    ? <CourseCollection courses={[course]} />
    : <div>ERROR</div>
}
