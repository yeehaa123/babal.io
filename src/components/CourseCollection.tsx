import { registerCourses } from "@/stores/courses";
import type { Course } from "@/types";
import type { ReactNode } from "react";

type Props = { courses: Course[], children: ReactNode }

export default function CourseCollection({ courses, children }: Props) {
  const courseIds = courses.map(c => c.goal);
  registerCourses(courseIds);
  return children;
}
