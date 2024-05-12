import { useOffcourseContext } from "@/containers/Offcourse";
import { login, logout } from "@/stores/authState";
import type { AuthData } from "@/stores/authState";

import type { Course } from "@/types";
import {
  determineRole,
  determineAffordances
} from "./helpers"
import { useCardState } from "./cardState";
import { OverlayModes } from "../overlays";

type StoreProps = {
  courseId: Course['courseId'],
  authData: AuthData
}

export interface AugmentedCourse extends Course {
  isBookmarked?: boolean | undefined
}

export function useCourseCardStore({ courseId, authData }: StoreProps) {

  const course = useOffcourseContext((state) => state.courses[courseId]);
  const { toggleBookmark, toggleComplete, cloneCourse } = useOffcourseContext((state) => state.actions);

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

  const signOut = () => {
    logout()
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
  const showNotesOverlay = () => {
    setOverlayMode(OverlayModes.NOTE)
  }

  const actions = {
    hideOverlay,
    setOverlayMode,
    authenticate,
    signIn,
    cloneCourse,
    signOut,
    showCloneOverlay,
    showNotesOverlay,
    showEditOverlay,
    showCheckpoint,
    hideCheckpoint,
    toggleMetaVisible,
    toggleComplete,
    toggleBookmark
  }

  return { course, checkpoint, cardState, affordances, actions }
}
