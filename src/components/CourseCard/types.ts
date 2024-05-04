import type { Course, Checkpoint } from "@/types";
import type { CoreState } from "./stores";
import type { Actions } from "./stores/actions";

export type Affordances = {
  canAuthenticate: boolean,
  canEdit: boolean,
  canTakeNotes: boolean,
  canClone: boolean,
  canCheckComplete: boolean,
  canBookmark: boolean
}

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


export type { Course, Checkpoint, CoreState, Actions }
