import type { Checkpoint, Course } from "@/types";

export interface AugmentedCheckpoint extends Checkpoint {
  isCompleted?: boolean | undefined;
}

export interface AugmentedCourse extends Omit<Course, 'checkpoints'> {
  tags: string[],
  isBookmarked?: boolean | undefined,
  notes: CourseNote[]
  checkpoints: AugmentedCheckpoint[]
}

export type LearnData = {
  isBookmarked: boolean,
  tasksCompleted: boolean[],
  notes: CourseNote[]
}

export interface CourseNote {
  createdAt: Date,
  message: string
}
