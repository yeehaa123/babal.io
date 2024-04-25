import { map } from 'nanostores';

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

