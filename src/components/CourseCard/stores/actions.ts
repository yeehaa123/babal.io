import { OverlayModes } from "../types";
import type { Course } from "../types";
import { $coreState, } from "./coreState"
import { login, logout } from "@/stores/authState";

export function setBookmarked(isBookmarked: boolean) {
  $coreState.setKey('isBookmarked', isBookmarked)
}

export function setMetaVisible(isMetaVisible: boolean) {
  $coreState.setKey('isMetaVisible', isMetaVisible);
}


export function setOverlayMode(mode: OverlayModes) {
  $coreState.setKey("overlayMode", mode);
}

export function hideOverlay() {
  $coreState.setKey("overlayMode", OverlayModes.NONE);
}

export function updateCourse(course: Course) {
  const { alias } = course.curator;
  $coreState.setKey('alias', alias);
}

export function signIn() {
  return setOverlayMode(OverlayModes.AUTH);
};

export async function authenticate() {
  await login();
  setOverlayMode(OverlayModes.NONE);
}

export function signOut() {
  logout();
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
