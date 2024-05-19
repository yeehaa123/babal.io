import type {
  AugmentedCourse,
  AugmentedCheckpoint
} from "@/offcourse/types";
import type { StoreActions } from "../collection/actions";

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

export enum CardRoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}

export type Affordances = {
  canAuthenticate: boolean,
  canBookmark: boolean,
  canTakeNotes: boolean
  canCheckComplete: boolean,
  canClone: boolean,
  canEdit: boolean

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
