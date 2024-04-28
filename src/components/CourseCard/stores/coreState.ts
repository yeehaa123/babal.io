import { map } from 'nanostores';
import { OverlayModes } from "../types";


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

