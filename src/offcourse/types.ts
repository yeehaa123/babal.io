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

export type AuthData = {
  userName: string | undefined;
}

export type LearnRecord = {
  isBookmarked: boolean,
  tasksCompleted: string[],
  notes: CourseNote[]
}

export interface CourseNote {
  createdAt: Date,
  message: string
}

export type Curator = {
  alias: string;
  socials: { linkedin?: string }
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

export interface CourseQuery {
  courseId: Course['courseId']
}

export interface CheckpointQuery extends CourseQuery {
  checkpointId: Checkpoint['checkpointId']
}

