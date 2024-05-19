import { OverlayModes } from "./types";
import type { CardState } from "./types";
import { useState } from "react";


export function useCardState() {
  const [cardState, setState] = useState<CardState>({
    overlayMode: OverlayModes.NONE,
    selectedCheckpoint: undefined,
    isMetaVisible: false,
  })

  const actions = {
    setOverlayMode: (overlayMode: OverlayModes) => {
      setState((state) => {
        return {
          ...state,
          overlayMode
        }
      })
    },
    toggleMetaVisible: () => {
      setState((state) => {
        return {
          ...state,
          isMetaVisible: !state.isMetaVisible
        }
      })

    },
    hideOverlay: () => {
      setState((state) => {
        return {
          ...state,
          overlayMode: OverlayModes.NONE
        }
      })
    },
  }
  return { cardState, ...actions }
}
