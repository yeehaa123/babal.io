import { cn } from "@/lib/utils"
import { OverlayModes } from "../stores"
import SignInOverlay from "./SignInOverlay";
import EditOverlay from "./EditOverlay";
import MockOverlay from "./MockOverlay";
import NoteOverlay from "./NoteOverlay";
import CloneOverlay from "./CloneOverlay";

import {
} from "@/components/ui/card"

interface Props {
  close: () => void,
  overlayMode: OverlayModes
}

export type Overlay = {
  overlayMode: OverlayModes
  onCancel: () => void,
  onConfirm: (v: any) => void,
}

function OverlayData(props: Overlay) {
  const Comp = {
    [OverlayModes.AUTH]: SignInOverlay,
    [OverlayModes.EDIT]: EditOverlay,
    [OverlayModes.NONE]: MockOverlay,
    [OverlayModes.NOTE]: NoteOverlay,
    [OverlayModes.CLONE]: CloneOverlay,
  }[props.overlayMode]
  return <Comp {...props} />
}

export default function Overlay({ close, overlayMode }: Props) {
  const isVisible = overlayMode !== OverlayModes.NONE;
  return (
    <div
      className={cn("absolute top-0 h-full w-full flex flex-col justify-between", {
        "bg-white/95": isVisible,
        "opacity-0": !isVisible,
        "pointer-events-none": !isVisible,
        "z-10": isVisible
      })}>
      <OverlayData overlayMode={overlayMode} onCancel={close} onConfirm={console.log} />
    </div>
  )
}
