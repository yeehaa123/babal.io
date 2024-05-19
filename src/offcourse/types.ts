import type { StoreActions } from "./stores/actions";

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

export type LearnData = {
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

export interface CourseQuery {
  courseId: Course['courseId']
}

export interface CheckpointQuery extends CourseQuery {
  checkpointId: Checkpoint['checkpointId']
}
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


export type Affordances = {
  canAuthenticate: boolean,
  canBookmark: boolean,
  canTakeNotes: boolean
  canCheckComplete: boolean,
  canClone: boolean,
  canEdit: boolean
}

export enum CardRoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}

export interface CardState {
  overlayMode: OverlayModes,
  selectedCheckpoint: string | undefined,
  isMetaVisible: boolean
}

export type CourseCardStore = {
  course: AugmentedCourse,
  checkpoint: AugmentedCheckpoint | undefined,
  actions: StoreActions,
  cardState: CardState,
  affordances: Affordances
}
