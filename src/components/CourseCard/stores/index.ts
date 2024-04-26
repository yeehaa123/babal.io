import type { Course } from "../types";
import { $courseCardState, updateCourse } from "./courseCardState";
import { useStore } from '@nanostores/react';

export default function useCourseCardStore(course: Course) {
  updateCourse(course);
  return useStore($courseCardState);
}
