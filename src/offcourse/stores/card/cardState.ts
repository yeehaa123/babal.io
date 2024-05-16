import { OverlayModes } from "./types";
import { useState } from "react";

type CardState = {
  overlayMode: OverlayModes,
  selectedCheckpoint: string | undefined,
  isMetaVisible: boolean
}

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
    showCheckpoint: (checkpointId: string) => {
      setState((state) => {
        return {
          ...state,
          overlayMode: OverlayModes.CHECKPOINT,
          selectedCheckpoint: checkpointId
        }
      })
    },
    hideCheckpoint: () => {
      setState((state) => {
        return {
          ...state,
          overlayMode: OverlayModes.NONE,
          selectedCheckpoint: undefined
        }
      })
    }
  }
  return { cardState, ...actions }
}
