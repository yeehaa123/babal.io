import { computed } from 'nanostores';
import {
  $coreState,
  OverlayModes,
} from "./coreState";
import {
  authenticate,
  signIn,
  signOut,
  updateCourse,
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
  {
    isAuthenticable,
    isClonable,
    isEditable,
    isCheckable,
    isBookmarkable
  }) => {

  function toggleBookmark() {
    setBookmarked(!isBookmarked)
  }

  function toggleComplete() {
    setBookmarked(!isBookmarked)
  }

  const toggleMetaVisible = () => setMetaVisible(!isMetaVisible);

  return {
    isAuthenticable,
    isMetaVisible,
    isBookmarked,
    isBookmarkable,
    isCheckable,
    isClonable,
    isEditable,
    overlayMode,
    toggleMetaVisible,
    toggleBookmark,
    toggleComplete,
    editCourse,
    cloneCourse,
    signIn,
    authenticate,
    signOut
  };
});

export { updateCourse, OverlayModes };
