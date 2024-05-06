import type { Course } from "@/types";
import CourseContent from "./CourseContent";
import type { CourseCardStore } from "./stores";
import { CourseContainer } from "@/containers/Offcourse"
import Overlay from "./overlays";

export type CourseCard = CourseCardStore

export interface CourseCardContainer {
  store?: CourseCardStore,
  course?: Course,
  standAlone?: boolean,
}

function Wrapper({ store }: { store?: CourseCardStore | undefined }) {
  if (store) {
    return store.state.overlayMode
      ? <Overlay {...store} />
      : <CourseContent {...store} />
  }
  return <div>Error</div>
}


export default function CourseCard(
  { course, store }: CourseCardContainer) {
  if (course) {
    return (
      <CourseContainer course={course} >
        <Wrapper />
      </CourseContainer>
    )
  } else
    return (
      <Wrapper store={store} />
    )
}
