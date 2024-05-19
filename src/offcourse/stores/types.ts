import type { StoreActions } from "./actions";
import type {
  AuthData,
  LearnData,
  AugmentedCourse,
  AugmentedCheckpoint
} from "@/offcourse/types"

export type Affordances = {
  canAuthenticate: boolean,
  canBookmark: boolean,
  canTakeNotes: boolean
  canCheckComplete: boolean,
  canClone: boolean,
  canEdit: boolean
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

export type CardState = {
  overlayMode: OverlayModes,
  selectedCheckpoint: string | undefined,
  isMetaVisible: boolean
}

type LearnDataState = Record<string, LearnData>

export enum CardRoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}

export type OffcourseState = {
  cardStates: Record<string, CardState>
  authData: AuthData,
  courses: Record<string, AugmentedCourse>,
  learnData: LearnDataState,
  actions: StoreActions
}

export type CourseCardStore = {
  course: AugmentedCourse,
  checkpoint: AugmentedCheckpoint | undefined,
  actions: OffcourseState['actions'],
  cardState: CardState,
  affordances: Affordances
}
