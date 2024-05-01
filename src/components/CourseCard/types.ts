import type { Course, Checkpoint } from "@/types";

export type Affordances = {
  canAuthenticate: boolean,
  canEdit: boolean,
  canTakeNotes: boolean,
  canClone: boolean,
  canCheckComplete: boolean,
  canBookmark: boolean
}

export type Actions = {
  authenticate: () => void,
  signIn: () => void,
  signOut: () => void,
  editCourse: () => void,
  addNotes: () => void,
  cloneCourse: () => void;
  toggleBookmark: () => void,
  toggleComplete: () => void,
  toggleMetaVisible: () => void
  showCheckpoint: (task: string) => void
}

export type { Course, Checkpoint }

export enum OverlayModes {
  AUTH = "AUTH",
  EDIT = "EDIT",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  CLONE = "CLONE"
}

export enum RoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}
export type CoreState = {
  overlayMode: OverlayModes | undefined,
  course: Course,
  checkpoint: Checkpoint | undefined,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

