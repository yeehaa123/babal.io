import { useOffcourseContext } from "@/containers/Offcourse";
import { OverlayModes } from "../overlays";
import { determineAffordances } from "@/components/CourseCard/stores/affordancesHelpers";
import { determineRole } from "@/components/CourseCard/stores/roleHelpers";
import type { AuthData } from "@/stores/authState";
import type { Course } from "@/types";

type StoreProps = {
  courseId: Course['id'],
  authData: AuthData
}

export function useCourseCardStore(
  { courseId, authData }: StoreProps
) {

  const rawCourse = useOffcourseContext((state) => state.courses[courseId]);
  const learnData = useOffcourseContext((state) => state.learnData[courseId]);
  console.log(courseId, learnData);

  if (!rawCourse) {
    return
  }

  const cardState = {
    overlayMode: OverlayModes.NONE,
    isMetaVisible: false,
  }

  const course = { ...rawCourse, isBookmarked: undefined };

  const checkpoint = undefined;

  const role = determineRole({ course, authData });
  const affordances = determineAffordances(role);

  const actions = {
    hideCheckpoint: console.log(),
    toggleBookmark: console.log()
  }


  return { course, checkpoint, cardState, affordances, actions }
}
