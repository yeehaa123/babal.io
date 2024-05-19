import {
  db,
  inArray,
  and,
  eq,
  CompletionData,
  BookmarkData,
  NoteData
} from 'astro:db';

import type { LearnData } from '@/offcourse/types';

export async function getLearnDataByUserNameAndCourseIds({ userName, courseIds }:
  { userName: string, courseIds: string[] }) {

  const learnDataDBResult = await db
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

  const learnData = learnDataDBResult.reduce((acc, row) => {
    const { courseId, checkpointId, completedAt } = row;
    const ld = acc.get(courseId);

    if (!ld) {
      const isBookmarked = bookmarkDataDBResult.find(c => c.courseId === courseId);
      acc.set(courseId, {
        isBookmarked: !!isBookmarked,
        tasksCompleted: [checkpointId],
        notes: noteDataDBResult ? noteDataDBResult.map(
          ({ message, createdAt }) => {
            return { message, createdAt }
          }) : []
      })

      return acc;
    } else {
      const tasksCompleted = new Set([...ld.tasksCompleted]);
      completedAt && tasksCompleted.add(checkpointId);
      acc.set(courseId,
        { ...ld, tasksCompleted: [...tasksCompleted] })
    }

    return acc;
  }, new Map<string, LearnData>)

  return Object.fromEntries(learnData);
}
