import { OverlayModes } from "@/offcourse/types"

export type CardState = {
  overlayMode: OverlayModes,
  selectedCheckpoint: string | undefined,
  isMetaVisible: boolean
}

export const initialCardState = {
  overlayMode: OverlayModes.NONE,
  selectedCheckpoint: undefined,
  isMetaVisible: false,
}
