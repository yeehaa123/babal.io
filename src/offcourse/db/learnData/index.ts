import type { Course, Curator } from "@/offcourse/types";
import { getLearnDataByUserNameAndCourseIds } from "./queries";

type LearnDataQueryParams = {
  userName: Curator['alias'],
  courseIds: Course['courseId'][]
}

export function getLearnData({ userName, courseIds }: LearnDataQueryParams) {
  return getLearnDataByUserNameAndCourseIds({ userName, courseIds });
}
