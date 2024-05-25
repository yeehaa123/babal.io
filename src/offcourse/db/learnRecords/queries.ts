import type { LearnRecord } from "@/offcourse/models/LearnRecord"
import type { Course } from '@/offcourse/types';
import {
  db,
  inArray,
  and,
  eq,
  CompletionData,
  BookmarkData,
  NoteData
} from 'astro:db';

export async function getLearnRecordByUserNameAndCourseId({ userName, courseId }:
  { userName: string, courseId: Course['courseId'] }) {
  const results = await getLearnRecordByUserNameAndCourseIds({ userName, courseIds: [courseId] });
  return results[courseId];
}

export async function getLearnRecordByUserNameAndCourseIds({ userName, courseIds }:
  { userName: string, courseIds: string[] }) {

  const learnRecordsDBResult = await db
    .select()
    .from(CompletionData)
    .where((and(
      eq(CompletionData.userName, userName),
      inArray(CompletionData.courseId, courseIds)
    )))

  const bookmarkDataDBResult = await db
    .select()
    .from(BookmarkData)
    .where((and(
      eq(BookmarkData.userName, userName),
      inArray(BookmarkData.courseId, courseIds)
    )))

  const noteDataDBResult = await db
    .select()
    .from(NoteData)
    .where((and(
      eq(NoteData.userName, userName),
      inArray(NoteData.courseId, courseIds)
    )))

  const learnRecords = learnRecordsDBResult.reduce((acc, row) => {
    const { courseId, checkpointId, completedAt } = row;
    const ld = acc.get(courseId);

    if (!ld) {
      const isBookmarked = bookmarkDataDBResult.find(c => c.courseId === courseId);
      acc.set(courseId, {
        courseId,
        isBookmarked: !!isBookmarked,
        tasksCompleted: { [checkpointId]: !!completedAt },
        notes: noteDataDBResult ? noteDataDBResult.map(
          ({ message, createdAt }) => {
            return { message, createdAt }
          }) : []
      })

      return acc;
    } else {
      const tasksCompleted = ld.tasksCompleted;
      acc.set(courseId,
        { ...ld, tasksCompleted: { [checkpointId]: !!completedAt, ...tasksCompleted } })
    }

    return acc;
  }, new Map<string, LearnRecord>)

  return Object.fromEntries(learnRecords);
}
