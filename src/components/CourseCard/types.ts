import type { Course } from "@/types";

export type Affordances = {
  isAuthenticable: boolean,
  isEditable: boolean,
  isNotable: boolean,
  isClonable: boolean,
  isCheckable: boolean,
  isBookmarkable: boolean
}

export type Actions = {
  signIn: () => void,
  signOut: () => void,
  editCourse: () => void,
  showCheckpoint: () => void,
  addNotes: () => void,
  cloneCourse: () => void;
  toggleBookmark: () => void,
  toggleComplete: () => void,
  toggleMetaVisible: () => void
}

export type { Course }

export enum OverlayModes {
  AUTH = "AUTH",
  EDIT = "EDIT",
  NONE = "NONE",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  CLONE = "CLONE"
}
