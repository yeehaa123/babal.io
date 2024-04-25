import { computed } from 'nanostores';
import {
  $coreState,
  authenticate,
  closeOverlay,
  OverlayModes,
  updateCourse,
  setBookmarked,
  setOverlayMode,
  setMetaVisible
} from "./coreState";
import { $affordancesState } from "./affordancesState"

export const $courseCardState = computed([$coreState, $affordancesState], (
  {
    overlayMode,
    isMetaVisible,
    isBookmarked,
  },
  {
    isClonable,
    isEditable,
    isCheckable,
    isBookmarkable
  }) => {

  function toggleBookmark() {
    return isBookmarkable ? setBookmarked(isBookmarked) : authenticate();
  }

  function toggleComplete() {
    return isCheckable ? setBookmarked(isBookmarked) : authenticate();
  }

  function editCourse() {
    return isEditable && setOverlayMode(OverlayModes.EDIT);
  }

  function cloneCourse() {
    return isClonable && setOverlayMode(OverlayModes.CLONE);
  }

  const toggleMetaVisible = () => setMetaVisible(!isMetaVisible);

  return {
    overlayMode,
    isMetaVisible,
    isBookmarked,
    isBookmarkable,
    isClonable,
    isEditable,
    toggleMetaVisible,
    toggleBookmark,
    toggleComplete,
    editCourse,
    cloneCourse,
    closeOverlay
  };
});

export { updateCourse, OverlayModes };
