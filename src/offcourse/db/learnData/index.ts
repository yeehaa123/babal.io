import type { Course, Curator } from "@/offcourse/types";
import { getLearnDataByUserNameAndCourseIds } from "./queries";

type GetLearnDataParams = {
  userName: Curator['alias'],
  courseIds: Course['courseId'][]
}


export function getLearnData({ userName, courseIds }: GetLearnDataParams) {
  return getLearnDataByUserNameAndCourseIds({ userName, courseIds });
}
