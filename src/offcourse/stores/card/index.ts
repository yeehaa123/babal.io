import type { Course } from "@/offcourse/types";
import { OverlayModes } from "./types";

import { useOffcourseContext } from "@/offcourse/stores/collection";
import {
  determineRole,
  determineAffordances
} from "./helpers"

import { useCardState } from "./cardState";

type StoreProps = {
  courseId: Course['courseId'],
}

export function useCourseCardStore({ courseId }: StoreProps) {

  const { authData, actions } = useOffcourseContext((state) => state);
  const course = useOffcourseContext((state) => state.courses[courseId]);

  const {
    toggleBookmark,
    toggleComplete,
    addNote,
    login,
    logout,
    ...storeActions
  } = actions;

  if (!course) {
    return
  }

  const {
    cardState,
    setOverlayMode,
    hideOverlay,
    showCheckpoint,
    hideCheckpoint,
    toggleMetaVisible
  } = useCardState();

  const { selectedCheckpoint } = cardState

  const checkpoint = course.checkpoints.find(cp => cp.task === selectedCheckpoint)
  const role = determineRole({ course, authData });
  const affordances = determineAffordances(role);

  const signIn = () => {
    setOverlayMode(OverlayModes.AUTH);
  }

  const authenticate = async () => {
    await login();
    hideOverlay();
  }

  const showCloneOverlay = () => {
    setOverlayMode(OverlayModes.CLONE)
  }
  const showEditOverlay = () => {
    setOverlayMode(OverlayModes.EDIT)
  }
  const showRegisterOverlay = () => {
    setOverlayMode(OverlayModes.REGISTER)
  }

  const showNotesOverlay = () => {
    setOverlayMode(OverlayModes.NOTE)
  }

  const showShareOverlay = () => {
    setOverlayMode(OverlayModes.SHARE)
  }
  const cloneCourse = () => {
    storeActions.cloneCourse({ courseId });
    hideOverlay();
  }

  const boundActions = {
    hideOverlay,
    setOverlayMode,
    authenticate,
    signIn,
    cloneCourse,
    addNote,
    signOut: logout,
    showCloneOverlay,
    showRegisterOverlay,
    showNotesOverlay,
    showEditOverlay,
    showShareOverlay,
    showCheckpoint,
    hideCheckpoint,
    toggleMetaVisible,
    toggleComplete,
    toggleBookmark
  }

  return { course, checkpoint, cardState, affordances, actions: boundActions }
}
