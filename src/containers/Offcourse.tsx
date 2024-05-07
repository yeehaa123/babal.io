import { registerCourses } from "@/stores/courses";
import { useStore } from "@nanostores/react";
import { $offcourseState } from "@/stores/offcourse";
import { useEffect } from "react";
import type { Course } from "@/types";
import type { CourseCardStore } from "@/components//CourseCard/stores";


export function useOffcourse(c: Course[]): CourseCardStore[] {
  useEffect(() => {
    registerCourses(c);
  }, [])
  const { stores } = useStore($offcourseState);
  return stores;
}

