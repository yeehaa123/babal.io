import { useState } from "react";

export default function useCourseCardStore() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);

  function toggleBookmark() {
    return isAuthenticated ? setBookmarked(v => !v) : setOverlayVisible(true);
  }

  function setBookmark() {
    return isAuthenticated ? setBookmarked(true) : setOverlayVisible(true);
  }

  function closeOverlay() {
    setAuthenticated(true);
    return setOverlayVisible(false)
  }

  return {
    isBookmarked,
    isOverlayVisible,
    toggleBookmark,
    setBookmark,
    closeOverlay
  }
}
