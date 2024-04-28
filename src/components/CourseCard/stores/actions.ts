import { OverlayModes } from "../types";
import type { Course } from "../types";
import { $coreState, } from "./coreState"
import { setAuthenticated } from "@/stores/authState";

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

export function authenticate() {
  setAuthenticated({ userName: "YEEHAA" });
  setOverlayMode(OverlayModes.NONE);
}

export function signOut() {
  setAuthenticated({ userName: undefined });
};

export function showCheckpoint() {
  return setOverlayMode(OverlayModes.CHECKPOINT);
};


export function editCourse() {
  setOverlayMode(OverlayModes.EDIT);
}

export function addNotes() {
  setOverlayMode(OverlayModes.NOTE);
}

export function cloneCourse() {
  return setOverlayMode(OverlayModes.CLONE);
}