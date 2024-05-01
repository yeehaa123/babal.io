import { computed } from 'nanostores';
import type { Course } from "@/types";
import {
  initiate as i,
  setBookmarked,
  setMetaVisible
} from "./coreCard";
import {
  initiate as initiateRoleState,
} from "./roleState";

import {
  addNotes,
  showCheckpoint,
  editCourse,
  cloneCourse,
} from "./actions"

import { initiate as initiateAffordanceState } from "./affordancesState"
import { initiate as initiateOverlayState } from "./overlayState"


function initiate(course: Course) {
  const { state, signIn } = i(course);
  const $roleState = initiateRoleState(state);
  const $affordancesState = initiateAffordanceState($roleState);
  const $overlayState = initiateOverlayState(state);

  return computed([state, $affordancesState, $overlayState], (
    {
      overlayMode,
      isMetaVisible,
      isBookmarked,
      course,
    },
    affordances,
    overlay,
  ) => {

    function toggleBookmark() {
      setBookmarked(!isBookmarked)
    }

    function toggleComplete() {
      setBookmarked(!isBookmarked)
    }

    const toggleMetaVisible = () => setMetaVisible(!isMetaVisible);


    function signOut() {
      console.log(overlay);
    }

    const actions = {
      toggleMetaVisible,
      toggleBookmark,
      toggleComplete,
      showCheckpoint,
      editCourse,
      cloneCourse,
      signIn,
      signOut,
      addNotes,
    }


    return {
      course,
      affordances,
      actions,
      overlayMode,
      isMetaVisible,
      isBookmarked,
      overlay,
    };
  });
}

export { initiate };
