export type Tag = string;

export type Course = {
  courseId: string,
  goal: string,
  description: string,
  curator: Curator,
  habitat?: string | undefined,
  checkpoints: Checkpoint[],
  tags: Tag[]
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

export type Curator = {
  alias: string;
  socials: {
    linkedin?: string
  }
}

export interface Checkpoint {
  courseId: string,
  checkpointId: string,
  task: string,
  href: string,
  description: string | undefined,
  tags: string[]
}

export interface AugmentedCheckpoint extends Checkpoint {
  isCompleted?: boolean | undefined;
}

export interface AugmentedCourse extends Omit<Course, 'checkpoints'> {
  tags: string[],
  isBookmarked?: boolean | undefined,
  notes: CourseNote[]
  checkpoints: AugmentedCheckpoint[]
}
