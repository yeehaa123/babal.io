import { map } from 'nanostores';
import type { Course } from "@/types";
import { setAuthenticated } from "@/stores/authState";

export enum OverlayModes {
  AUTH = "AUTH",
  EDIT = "EDIT",
  NONE = "NONE",
  CLONE = "CLONE"
}

type CourseCardState = {
  alias: string | undefined,
  overlayMode: OverlayModes,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

export const $coreState = map<CourseCardState>({
  alias: undefined,
  overlayMode: OverlayModes.NONE,
  isBookmarked: false,
  isMetaVisible: false
})

export const setBookmarked = (isBookmarked: boolean) => $coreState.setKey('isBookmarked', !isBookmarked)

export const setMetaVisible = (isMetaVisible: boolean) => $coreState.setKey('isMetaVisible', isMetaVisible);

export const setOverlayMode = (mode: OverlayModes) => $coreState.setKey("overlayMode", mode);

export const authenticate = () => {
  return setOverlayMode(OverlayModes.AUTH);
};

export function updateCourse(course: Course) {
  const { alias } = course.curator;
  $coreState.setKey('alias', alias);
}

export const closeOverlay = () => {
  setAuthenticated({ userName: "Yeehaa" });
  setOverlayMode(OverlayModes.NONE);
}
