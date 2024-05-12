import type { LearnData } from '@/stores/offcourse';
import { db, CompletionData, inArray, and, eq } from 'astro:db';

export async function getLearnData({ userName, courseIds }: { userName: string, courseIds: string[] }) {
  const dbResult = await db
    .select()
    .from(CompletionData)
    .where((and(
      eq(CompletionData.userName, userName),
      inArray(CompletionData.courseId, courseIds)
    )))

  const learnData = dbResult.reduce((acc, row) => {
    const { courseId, completedAt } = row;
    const ld = acc.get(courseId);

    const rand = Math.random() < 0.7
    if (!ld) {
      acc.set(courseId, { isBookmarked: rand, tasksCompleted: [!!completedAt] })
      return acc;
    } else {
      acc.set(courseId,
        { ...ld, tasksCompleted: [...ld.tasksCompleted, !!completedAt] })
    }
    return acc;
  }, new Map<string, LearnData>)
  return Object.fromEntries(learnData);
}
