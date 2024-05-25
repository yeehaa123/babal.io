import type { Checkpoint, CourseQuery, Course, CourseNote } from "../types";

export type LearnRecord = {
  courseId: Course['courseId'],
  isBookmarked: boolean,
  tasksCompleted: Record<Checkpoint['checkpointId'], boolean>,
  notes: CourseNote[]
}

export function initLearnRecord({ courseId }: CourseQuery): LearnRecord {
  return {
    courseId,
    isBookmarked: false,
    tasksCompleted: {},
    notes: []
  }
}

export function toggleTask(
  { tasksCompleted, ...learnRecord }: LearnRecord,
  checkpointId: Checkpoint['checkpointId']
) {
  return {
    ...learnRecord,
    tasksCompleted: {
      ...tasksCompleted,
      [checkpointId]: !tasksCompleted[checkpointId]
    }
  }
}

export function toggleBookmark(
  { isBookmarked, ...learnRecord }: LearnRecord
) {
  return {
    ...learnRecord,
    isBookmarked: !isBookmarked
  }
}

export function addNote(
  { notes, ...learnRecord }: LearnRecord
  , newNote: CourseNote) {
  return {
    ...learnRecord,
    notes: [newNote, ...notes]
  }
}
