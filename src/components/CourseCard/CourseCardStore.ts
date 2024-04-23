import { useState } from "react";
import type { Course } from "@/types";
import type { Auth } from "@/AuthStore";

type Props = {
  course: Course,
  auth: Auth
}

export default function useCourseCardStore({ course, auth }: Props) {
  const { curator } = course;
  const { isAuthenticated, authData, setAuthenticated } = auth;
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);
  const [metaVisible, setMetaVisible] = useState(false)
  const isCurator = authData.userName === curator.alias;

  const toggleMetaVisible = () => setMetaVisible(s => s = !s);

  function toggleBookmark() {
    return isAuthenticated ? setBookmarked(v => !v) : setOverlayVisible(true);
  }

  function setBookmark() {
    return isAuthenticated ? setBookmarked(true) : setOverlayVisible(true);
  }

  function closeOverlay() {
    setAuthenticated({ userName: "Yeehaa" });
    return setOverlayVisible(false)
  }

  return {
    isClonable: !isCurator,
    authData,
    metaVisible,
    toggleMetaVisible,
    isBookmarked,
    isOverlayVisible,
    toggleBookmark,
    setBookmark,
    closeOverlay
  }
}
