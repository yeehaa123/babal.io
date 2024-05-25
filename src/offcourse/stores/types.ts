import type { CardState } from "../models/CardState"
import type { Course } from "../models/Course";
import type { LearnRecord } from "../models/LearnRecord"
import type { StoreActions } from "./actions";
import type {
  AuthData,
  Checkpoint,
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
  courses: Record<string, Course>,
  learnRecords: LearnRecordsState,
  actions: StoreActions
}

export type CourseCardStore = {
  course: Course,
  learnRecord: LearnRecord | undefined,
  checkpoint: Checkpoint | undefined,
  actions: OffcourseState['actions'],
  cardState: CardState,
  affordances: Affordances
}
