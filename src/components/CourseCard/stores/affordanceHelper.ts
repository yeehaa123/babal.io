import { RoleTypes } from "./roleHelper";

export type Affordances = {
  canAuthenticate: boolean,
  canEdit: boolean,
  canTakeNotes: boolean,
  canClone: boolean,
  canCheckComplete: boolean,
  canBookmark: boolean
}

export default function determineAffordances(role: RoleTypes) {
  const canClone = role === RoleTypes.LEARNER;
  const canBookmark = role === RoleTypes.LEARNER || role === RoleTypes.COLLECTOR;
  const canCheckComplete = role === RoleTypes.LEARNER;
  const canTakeNotes = role === RoleTypes.COLLECTOR;
  const canEdit = role === RoleTypes.CURATOR;
  const canAuthenticate = role === RoleTypes.GUEST;
  return {
    canAuthenticate,
    canBookmark,
    canTakeNotes,
    canCheckComplete,
    canClone,
    canEdit
  }
}

