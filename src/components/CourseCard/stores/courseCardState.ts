import { computed } from 'nanostores';
import {
  $coreState,
} from "./coreState";
import {
  addNotes,
  authenticate,
  hideOverlay,
  signIn,
  signOut,
  updateCourse,
  showCheckpoint,
  editCourse,
  cloneCourse,
  setBookmarked,
  setMetaVisible
} from "./actions"

import { $affordancesState } from "./affordancesState"

export const $courseCardState = computed([$coreState, $affordancesState], (
  {
    overlayMode,
    isMetaVisible,
    isBookmarked,
  },
  affordances,
) => {

  function toggleBookmark() {
    setBookmarked(!isBookmarked)
  }

  function toggleComplete() {
    setBookmarked(!isBookmarked)
  }

  const toggleMetaVisible = () => setMetaVisible(!isMetaVisible);

  const actions = {
    toggleMetaVisible,
    toggleBookmark,
    toggleComplete,
    showCheckpoint,
    editCourse,
    cloneCourse,
    signIn,
    hideOverlay,
    authenticate,
    addNotes,
    signOut
  }

  return {
    affordances,
    actions,
    isMetaVisible,
    isBookmarked,
    overlayMode,
  };
});

export { updateCourse };
