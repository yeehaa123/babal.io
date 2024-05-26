import type { Course } from "@/offcourse/models/Course";
import type { LearnRecord } from "@/offcourse/models/LearnRecord";
import type {
  AuthData,
} from "@/offcourse/types";

import {
  CardRoleTypes
} from "@/offcourse/stores/types";

export function determineRole(
  { course, learnRecord, authData }:
    { course: Course, learnRecord: LearnRecord | undefined, authData: AuthData }) {
  const { userName } = authData;
  const isAuthenticated = !!userName;
  const isCurator = !!(course?.curator && userName === course.curator.alias);
  if (isAuthenticated) {
    if (isCurator) {
      return CardRoleTypes.CURATOR;
    } else if (learnRecord?.isBookmarked) {
      return CardRoleTypes.COLLECTOR;
    } else {
      return CardRoleTypes.LEARNER;
    }
  } else {
    return CardRoleTypes.GUEST;
  }
}

export function determineAffordances(role: CardRoleTypes) {
  const canClone = role === CardRoleTypes.LEARNER || role === CardRoleTypes.COLLECTOR;
  const canBookmark = role !== CardRoleTypes.GUEST;
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

