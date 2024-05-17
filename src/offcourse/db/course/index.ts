import type { Course, Curator, Tag } from "@/offcourse/types";
import {
  getCoursesByTag,
  getCourseByHabitat,
  getCoursesByCurator,
  getCourseById,
  getAllCourses
} from "./queries";

type CourseQueryParams = {
  courseId?: Course['courseId'],
  habitat?: Course['habitat']
}

function getCourse({ courseId, habitat }: CourseQueryParams) {
  if (courseId) {
    return getCourseById(courseId);
  } else if (habitat) {
    return getCourseByHabitat(habitat);
  }
  throw ("QUERY PARAMS ARE MANDATORY");
}

type CoursesQueryParams = {
  tag?: Tag,
  curator?: Curator['alias']
}

function getCourses(params?: CoursesQueryParams) {
  if (params) {
    const { tag, curator } = params;
    if (tag) {
      return getCoursesByTag(tag);
    } else if (curator) {
      return getCoursesByCurator(curator);
    }
  }
  return getAllCourses();
}

export {
  getCourse,
  getCourses
}
