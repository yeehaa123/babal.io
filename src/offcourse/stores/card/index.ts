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
  const actions = useOffcourseContext((state) => state.actions);
  const authData = useOffcourseContext((state) => state.authData);
  const course = useOffcourseContext((state) => state.courses[courseId]);
  const cardState = useOffcourseContext((state) => state.cardStates[courseId])!;

  const {
    toggleBookmark,
    toggleComplete,
    showCheckpoint,
    hideCheckpoint,
    addNote,
    signIn,
    authenticate,
    signOut,
    ...storeActions
  } = actions;

  if (!course) {
    return
  }

  const {
    setOverlayMode,
    hideOverlay,
    toggleMetaVisible
  } = useCardState();

  const checkpoint = course.checkpoints.find(
    cp => cp.checkpointId === cardState?.selectedCheckpoint)
  const role = determineRole({ course, authData });
  const affordances = determineAffordances(role);


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
    signOut,
    cloneCourse,
    addNote,
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
