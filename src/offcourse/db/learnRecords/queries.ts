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
    .select({
      courseId: CompletionData.courseId,
      checkpointId: CompletionData.checkpointId,
      completedAt: CompletionData.completedAt,
      bookmarkedAt: BookmarkData.bookmarkedAt,
      note: NoteData
    })
    .from(CompletionData)
    .where((and(
      eq(CompletionData.userName, userName),
      inArray(CompletionData.courseId, courseIds)
    )))
    .leftJoin(BookmarkData, and(
      eq(BookmarkData.userName, userName),
      eq(CompletionData.courseId, BookmarkData.courseId)))
    .leftJoin(NoteData, and(
      eq(NoteData.userName, userName),
      eq(CompletionData.courseId, NoteData.courseId)
    ))

  const learnRecords = learnRecordsDBResult.reduce((acc, row) => {
    const { courseId, checkpointId, completedAt, bookmarkedAt, note } = row;
    const isBookmarked = !!bookmarkedAt;
    const learnRecord = acc.get(courseId);

    if (!learnRecord) {
      const notes = note ? [note] : [];
      const tasksCompleted = { [checkpointId]: !!completedAt }

      acc.set(courseId, {
        courseId,
        isBookmarked,
        tasksCompleted,
        notes
      })

    } else {
      const { tasksCompleted, notes: oldNotes } = learnRecord;
      const noteExists = note && oldNotes.find(({ noteId }) => note.noteId === noteId);
      const notes = note ? [note, ...oldNotes] : oldNotes;

      acc.set(courseId, {
        ...learnRecord,
        notes: noteExists ? oldNotes : notes,
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
