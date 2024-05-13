import type { LearnData } from '@/stores/offcourse';
import { db, CompletionData, inArray, and, eq, BookmarkData } from 'astro:db';

export async function getLearnData({ userName, courseIds }: { userName: string, courseIds: string[] }) {
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


  const learnData = learnDataDBResult.reduce((acc, row) => {
    const { courseId, completedAt } = row;
    const ld = acc.get(courseId);

    if (!ld) {
      const isBookmarked = bookmarkDataDBResult.find(c => c.courseId === courseId);
      acc.set(courseId, {
        isBookmarked: !!isBookmarked,
        tasksCompleted: [!!completedAt]
      })
      return acc;
    } else {
      acc.set(courseId,
        { ...ld, tasksCompleted: [...ld.tasksCompleted, !!completedAt] })
    }
    return acc;
  }, new Map<string, LearnData>)
  return Object.fromEntries(learnData);
}
