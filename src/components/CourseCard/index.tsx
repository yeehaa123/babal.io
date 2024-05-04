import type { Course } from "@/types";
import CourseContent from "./CourseContent";
import Overlay from "./overlays"
import initialize from "./stores";

export default function CourseCard(course: Course) {
  const { state, actions, affordances } = initialize({ course });
  const { overlayMode, ...rest } = state;
  return overlayMode
    ? <Overlay
      affordances={affordances}
      actions={actions}
      overlayMode={overlayMode}
      {...rest} />

    : <CourseContent
      affordances={affordances}
      actions={actions}
      {...state} />
}
