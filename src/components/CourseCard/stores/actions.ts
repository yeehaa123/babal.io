import { $coreState, OverlayModes } from "./coreState"
import { setAuthenticated } from "@/stores/authState";
import type { Course } from "@/types";

export function setBookmarked(isBookmarked: boolean) {
  $coreState.setKey('isBookmarked', isBookmarked)
}

export function setMetaVisible(isMetaVisible: boolean) {
  $coreState.setKey('isMetaVisible', isMetaVisible);
}


export function setOverlayMode(mode: OverlayModes) {
  $coreState.setKey("overlayMode", mode);
}

export function updateCourse(course: Course) {
  const { alias } = course.curator;
  $coreState.setKey('alias', alias);
}

export function signIn() {
  return setOverlayMode(OverlayModes.AUTH);
};

export function authenticate({ userName }: { userName: string }) {
  setAuthenticated({ userName });
  setOverlayMode(OverlayModes.NONE);
}

export function signOut() {
  setAuthenticated({ userName: undefined });
};

export function editCourse() {
  setOverlayMode(OverlayModes.EDIT);
}

export function cloneCourse() {
  return setOverlayMode(OverlayModes.CLONE);
}
