import type { Checkpoint, Course } from "@/types";
import CourseContent from "./CourseContent";
import Overlay, { OverlayModes } from "./overlays";
import type { Affordances } from "@/components/CourseCard/stores/helpers";
import { useCourseCardStore } from "./stores";
import { CourseCardContainer } from "./CourseCardContainer";
import type { AuthData } from "@/stores/authState";
import type { CourseNote } from "@/stores/offcourse";

export interface CardState {
  overlayMode: OverlayModes,
  isMetaVisible: boolean
}

export interface AugmentedCourse extends Course {
  isBookmarked?: boolean | undefined,
  notes: CourseNote[]
}

export type CourseCardStore = {
  course: AugmentedCourse,
  checkpoint: Checkpoint | undefined,
  actions: any,
  cardState: CardState,
  affordances: Affordances
}

export function CourseCard({ courseId, authData }: { courseId: string, authData: AuthData }) {
  const store = useCourseCardStore({ courseId, authData });

  if (!store) {
    return <div>ERROR</div>
  }

  return store.cardState.overlayMode === OverlayModes.NONE
    ? <CourseContent {...store} />
    : <Overlay {...store} />
}

export default CourseCardContainer;

export type { Affordances };
