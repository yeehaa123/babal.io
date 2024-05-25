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

export async function getLearnRecordByUserNameAndCourseId(
  { userName, courseId }: { userName: string, courseId: Course['courseId'] }) {
  const results = await getLearnRecordByUserNameAndCourseIds({ userName, courseIds: [courseId] });
  return results[courseId];
}

export async function getLearnRecordByUserNameAndCourseIds(
  { userName, courseIds }: { userName: string, courseIds: string[] }) {
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

  const allNotes = noteDataDBResult ? noteDataDBResult : []

  const learnRecords = learnRecordsDBResult.reduce((acc, row) => {
    const { courseId, checkpointId, completedAt } = row;

    const isBookmarked = !!bookmarkDataDBResult
      .filter(({ bookmarkedAt }) => bookmarkedAt)
      .find(({ courseId: id }) => id === courseId);

    const notes = allNotes.filter(note => note.courseId === courseId)

    const learnRecord = acc.get(courseId);
    if (!learnRecord) {
      const tasksCompleted = { [checkpointId]: !!completedAt }
      acc.set(courseId, {
        courseId,
        isBookmarked,
        tasksCompleted,
        notes
      })
      return acc;
    } else {
      const { tasksCompleted } = learnRecord;
      acc.set(courseId, {
        ...learnRecord,
        tasksCompleted: {
          ...tasksCompleted,
          [checkpointId]: !!completedAt
        }
      })
    }

    return acc;
  }, new Map<string, LearnRecord>)

  return Object.fromEntries(learnRecords);
}
