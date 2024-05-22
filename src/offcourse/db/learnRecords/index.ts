import type { Course, Curator } from "@/offcourse/types";
import { getLearnRecordByUserNameAndCourseIds, getLearnRecordByUserNameAndCourseId } from "./queries";

type LearnRecordQueryParams = {
  userName: Curator['alias'],
  courseId: Course['courseId']
}
export function getLearnRecord({ userName, courseId }: LearnRecordQueryParams) {
  return getLearnRecordByUserNameAndCourseId({ userName, courseId });
}

type LearnRecordsQueryParams = {
  userName: Curator['alias'],
  courseIds: Course['courseId'][]
}

export function getLearnRecords({ userName, courseIds }: LearnRecordsQueryParams) {
  return getLearnRecordByUserNameAndCourseIds({ userName, courseIds });
}
