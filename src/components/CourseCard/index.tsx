import type { Course } from "@/types";
import CourseContent from "./CourseContent";
import Overlay from "./overlays"
import { useCourseCardStore } from "./stores";

export default function CourseCard(course: Course) {
  const { state, actions, affordances } = useCourseCardStore({ course });
  const { overlayMode, ...rest } = state;
  return overlayMode
    ? <Overlay
      affordances={affordances}
      actions={actions}
      state={{ overlayMode, ...rest }} />

    : <CourseContent
      affordances={affordances}
      actions={actions}
      state={state} />
}
