import type { Course } from "@/types";
import CourseContent from "./CourseContent";
import Overlay from "./overlays"
import { useCourseCardStore } from "./stores";
import OffcourseContainer from "@/containers/Offcourse"

type Props = {
  course: Course,
  standAlone?: boolean
}

export default function CourseCard({ course, standAlone = true }: Props) {
  const { state, actions, affordances } = useCourseCardStore({ course });
  const { overlayMode, ...rest } = state;
  return <OffcourseContainer standAlone={standAlone} courses={[course]}>
    {
      overlayMode
        ? <Overlay
          affordances={affordances}
          actions={actions}
          state={{ overlayMode, ...rest }} />

        : <CourseContent
          affordances={affordances}
          actions={actions}
          state={state} />
    }
  </OffcourseContainer>
}
