import type { CardState } from "../models/cardState"
import type { StoreActions } from "./actions";
import type {
  AuthData,
  LearnRecord,
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


type LearnRecordsState = Record<string, LearnRecord>

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
  learnRecords: LearnRecordsState,
  actions: StoreActions
}

export type CourseCardStore = {
  course: AugmentedCourse,
  checkpoint: AugmentedCheckpoint | undefined,
  actions: OffcourseState['actions'],
  cardState: CardState,
  affordances: Affordances
}
