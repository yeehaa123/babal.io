import { registerCourses } from "@/stores/courses";
import type { Course } from "@/types";
import type { ReactNode } from "react";

type Props = { standAlone?: boolean, courses: Course[], children: ReactNode }

export default function OffcourseContainer({ standAlone = true, courses, children }: Props) {
  if (standAlone) { registerCourses(courses); }
  return <>
    {children}
  </>
}
