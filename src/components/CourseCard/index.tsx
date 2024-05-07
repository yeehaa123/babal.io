import type { Course } from "@/types";
import CourseContent from "./CourseContent";
import type { CourseCardStore } from "./stores";
import Overlay from "./overlays";
import CourseCollection from "@/components/CourseCollection"

export type CourseCard = CourseCardStore

export interface CourseCardContainer {
  store?: CourseCardStore,
  course?: Course,
}

export default function CourseCard(
  { course, store }: CourseCardContainer) {
  if (store) {
    return store.state.overlayMode
      ? <Overlay {...store} />
      : <CourseContent {...store} />
  }
  return course
    ? <CourseCollection courses={[course]} />
    : <div>ERROR</div>
}
