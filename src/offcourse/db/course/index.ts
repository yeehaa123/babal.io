import type { Course, Curator, Tag } from "@/offcourse/types";
import {
  getCoursesByTag,
  getCourseByHabitat,
  getCoursesByCurator,
  getCourseById,
  getAllCourses
} from "./queries";

type getCourseQueryParams = {
  courseId?: Course['courseId'],
  habitat?: Course['habitat']
}

function getCourse({ courseId, habitat }: getCourseQueryParams) {
  if (courseId) {
    return getCourseById(courseId);
  } else if (habitat) {
    return getCourseByHabitat(habitat);
  }
  throw ("QUERY PARAMS ARE MANDATORY");
}

type getCoursesQueryParams = {
  tag?: Tag,
  curator?: Curator['alias']
}

function getCourses(params?: getCoursesQueryParams) {
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
