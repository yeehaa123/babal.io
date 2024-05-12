import type { AugmentedCourse } from "..";
import type { AuthData } from "@/stores/authState";

export enum CardRoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}

export type Affordances = ReturnType<typeof determineAffordances>

export function determineRole(
  { course, authData }:
    { course: AugmentedCourse, authData: AuthData }) {
  const { userName } = authData;
  const { isBookmarked } = course;
  const isAuthenticated = !!userName;
  const isCurator = !!(course?.curator && userName === course.curator.alias);
  if (isAuthenticated) {
    if (isCurator) {
      return CardRoleTypes.CURATOR;
    } else if (isBookmarked) {
      return CardRoleTypes.COLLECTOR;
    } else {
      return CardRoleTypes.LEARNER;
    }
  } else {
    return CardRoleTypes.GUEST;
  }
}

export function determineAffordances(role: CardRoleTypes) {
  const canClone = role === CardRoleTypes.LEARNER;
  const canBookmark = role !== CardRoleTypes.GUEST;
  // const canCheckComplete = role === CardRoleTypes.LEARNER || role === CardRoleTypes.COLLECTOR;
  const canCheckComplete = role !== CardRoleTypes.GUEST;
  const canTakeNotes = role === CardRoleTypes.COLLECTOR;
  const canEdit = role === CardRoleTypes.CURATOR;
  const canAuthenticate = role === CardRoleTypes.GUEST;
  return {
    canAuthenticate,
    canBookmark,
    canTakeNotes,
    canCheckComplete,
    canClone,
    canEdit
  }
}

