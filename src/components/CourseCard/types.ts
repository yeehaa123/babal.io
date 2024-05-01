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
  signIn: () => void,
  signOut: () => void,
  editCourse: () => void,
  showCheckpoint: (args: Checkpoint) => void,
  addNotes: () => void,
  cloneCourse: () => void;
  toggleBookmark: () => void,
  toggleComplete: () => void,
  toggleMetaVisible: () => void
}

export type { Course, Checkpoint }

export enum OverlayModes {
  AUTH = "AUTH",
  EDIT = "EDIT",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  CLONE = "CLONE"
}

