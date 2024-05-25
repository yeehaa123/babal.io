export type Tag = string;

export enum OverlayModes {
  NONE = "NONE",
  AUTH = "AUTH",
  REGISTER = "REGISTER",
  EDIT = "EDIT",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  SHARE = "SHARE",
  CLONE = "CLONE"
}

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

export interface CourseNote {
  courseId: Course['courseId'],
  createdAt: Date,
  message: string
}

export type Curator = {
  alias: string;
  socials: { linkedin?: string }
}

export interface Checkpoint {
  order: number,
  courseId: string,
  checkpointId: string,
  task: string,
  href: string,
  description: string | undefined,
  tags: string[],
}

export interface CourseQuery {
  courseId: Course['courseId'],
  checkpointId?: Checkpoint['checkpointId']
}

export interface CheckpointQuery extends CourseQuery {
  checkpointId: Checkpoint['checkpointId']
}

