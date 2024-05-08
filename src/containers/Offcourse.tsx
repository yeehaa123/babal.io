import { registerCourses } from "@/stores/offcourse";
import { useStore } from "@nanostores/react";
import { $offcourseState } from "@/stores/offcourse";
import { useEffect } from "react";
import type { Course } from "@/types";
import type { CourseCardStore } from "@/components//CourseCard/stores";
import { $missingLearnData } from "@/stores/learnData";


export function useOffcourse(c: Course[]): CourseCardStore[] {
  useEffect(() => {
    registerCourses(c);
  }, [])
  useStore($missingLearnData);
  const { stores } = useStore($offcourseState);
  return stores;
}

