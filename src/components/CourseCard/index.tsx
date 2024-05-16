import CourseContent from "./CourseContent";
import Overlay from "./overlays";
import type { Affordances } from "@/offcourse/stores/card/helpers";
import { OverlayModes } from "@/offcourse/stores/card/types";
import type {
  AugmentedCourse,
  AugmentedCheckpoint
} from "@/offcourse/types";
import { useCourseCardStore } from "@/offcourse/stores/card";
import { CourseCardContainer } from "./CourseCardContainer";
import type { AuthData } from "@/stores/authState";

export interface CardState {
  overlayMode: OverlayModes,
  isMetaVisible: boolean
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
