import type {
  LearnData,
  Course,
  AugmentedCourse,
  AuthData,
} from "@/offcourse/types";

import {
  CardRoleTypes
} from "@/offcourse/stores/types";

export function prepareCourse(
  { course, learnData }:
    { course: Course, learnData: LearnData | undefined }) {
  return {
    ...course, checkpoints: course.checkpoints.map((cp) => {
      const isCompleted = learnData &&
        new Set([...learnData.tasksCompleted]).has(cp.checkpointId);
      return {
        ...cp,
        isCompleted
      }
    }),
    isBookmarked: learnData?.isBookmarked,
    notes: learnData?.notes || []
  }
}

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

