import { map } from 'nanostores';
import { useState } from "react";
import type { MapStore, } from 'nanostores';
import type { Course } from "../types";
import { OverlayModes } from "../types";

export type CourseCardState = {
  overlayMode: OverlayModes | undefined,
  course: Course,
  isBookmarked: boolean,
  isMetaVisible: boolean
}
export type CourseCardStore = MapStore<CourseCardState>

export function setBookmarked(isBookmarked: boolean) {
  console.log(isBookmarked)
}

export function setMetaVisible(isMetaVisible: boolean) {
  console.log(isMetaVisible)
}

export function initiate(course: Course) {
  const $coreState = map<CourseCardState>({
    overlayMode: undefined,
    course,
    isBookmarked: false,
    isMetaVisible: false
  })

  function signIn() {
    $coreState.setKey("overlayMode", OverlayModes.AUTH);
  }
  const [state] = useState($coreState);

  return {
    state, signIn
  }
}
