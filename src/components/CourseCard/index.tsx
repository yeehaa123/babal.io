import CourseCollection from "@/components/CourseCollection"
import type { Course } from "@/types";
import type { Affordances } from "./stores/affordancesHelpers";
import { useOffcourseContext } from "@/containers/Offcourse";
import CourseContent from "./CourseContent";
import Overlay, { OverlayModes } from "./overlays";
import type { CourseCardStore } from "@/stores/offcourse";


export interface CourseCardContainer {
  course?: Course,
  courseId?: string,
}

function CourseCard({ courseId }: { courseId: string }) {
  const store = useOffcourseContext((state) => state.stores[courseId])
  if (!store) {
    return <div>ERROR</div>
  }
  return store.cardState.overlayMode === OverlayModes.NONE
    ? <CourseContent {...store} />
    : <Overlay {...store} />
}

export default function CourseCardContainer(
  { course, courseId }: CourseCardContainer) {
  if (courseId) {
    return <CourseCard courseId={courseId} />
  }
  return course
    ? <CourseCollection courses={[course]} />
    : <div>ERROR</div>
}

export type { Affordances, CourseCardStore };
