import { registerCourses } from "@/stores/courses";
import type { CourseCardContainer } from "@/components/CourseCard";
import { useStore } from "@nanostores/react";
import { $offcourseState } from "@/stores/offcourse";
import { cloneElement, useEffect } from "react";
import type { ReactElement } from "react";
import type { Course } from "@/types";
import { determineAffordances } from "@/components/CourseCard/stores/affordancesHelpers";
import { RoleTypes } from "@/components/CourseCard/stores/roleHelpers";
import bind from "@/components/CourseCard/stores/actions"

type Props = {
  courses: Course[],
  children: ReactElement<CourseCardContainer>
}

export function CollectionContainer({ courses: c, children }: Props) {
  useEffect(() => {
    registerCourses(c);
  }, [])
  const { courses } = useStore($offcourseState);
  return courses.map((course) => {
    let checkpoint;

    const state = {
      overlayMode: undefined,
      course,
      checkpoint,
      isBookmarked: false,
      isMetaVisible: false,
    }


    const affordances = determineAffordances(RoleTypes.GUEST);
    const actions = bind(state);

    const store = {
      state,
      affordances,
      actions
    }

    return cloneElement(children, {
      key: course.goal,
      standAlone: false,
      store
    })
  })
}

export function CourseContainer(
  { course, children }: { course: Course, children: ReactElement }) {
  return <CollectionContainer courses={[course]}>{children}</CollectionContainer>
}
