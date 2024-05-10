import { useOffcourseContext } from "@/containers/Offcourse";
import { OverlayModes } from "../overlays";
import { determineAffordances } from "@/components/CourseCard/stores/affordancesHelpers";
import { determineRole } from "@/components/CourseCard/stores/roleHelpers";
import type { AuthData } from "@/stores/authState";

export function useCourseCardStore(
  { courseId, authData }: { courseId: string, authData: AuthData }
) {
  const rawCourse = useOffcourseContext((state) => state.courses[courseId])

  if (!rawCourse) {
    return
  }

  const cardState = {
    overlayMode: OverlayModes.NONE,
    isMetaVisible: false,
  }

  const course = { ...rawCourse, isBookmarked: true };

  const checkpoint = undefined;

  const role = determineRole({ course, authData });
  const affordances = determineAffordances(role);

  const actions = {
    hideCheckpoint: console.log(),
    toggleBookmark: console.log()
  }


  return { course, checkpoint, cardState, affordances, actions }
}
