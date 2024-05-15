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

export interface AugmentedCheckpoint extends Checkpoint {
  isCompleted?: boolean | undefined;
}

export interface AugmentedCourse extends Omit<Course, 'checkpoints'> {
  tags: string[],
  isBookmarked?: boolean | undefined,
  notes: CourseNote[]
  checkpoints: AugmentedCheckpoint[]
}

export type CourseCardStore = {
  course: AugmentedCourse,
  checkpoint: AugmentedCheckpoint | undefined,
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
