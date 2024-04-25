import { cn } from "@/lib/utils"
import { OverlayModes } from "../stores"
import SignInOverlay from "./SignInOverlay";
import EditOverlay from "./EditOverlay";
import MockOverlay from "./MockOverlay";
import CloneOverlay from "./CloneOverlay";

import {
  CardContent,
} from "@/components/ui/card"

interface Props {
  close: () => void,
  overlayMode: OverlayModes
}

export type Overlay = {
  overlayMode: OverlayModes
}

function OverlayData(props: Overlay) {
  const Comp = {
    [OverlayModes.AUTH]: SignInOverlay,
    [OverlayModes.EDIT]: EditOverlay,
    [OverlayModes.NONE]: MockOverlay,
    [OverlayModes.CLONE]: CloneOverlay,
  }[props.overlayMode]
  return <Comp {...props} />
}

export default function Overlay({ close, overlayMode }: Props) {
  const isVisible = overlayMode !== OverlayModes.NONE;
  return (
    <div
      onClick={close}
      className={cn("absolute top-0 h-full w-full flex justify-center items-center", {
        "bg-white/95": isVisible,
        "opacity-0": !isVisible,
        "pointer-events-none": !isVisible,
        "z-10": isVisible
      })}>
      <CardContent className="space-y-4">
        <OverlayData overlayMode={overlayMode} />
      </CardContent>
    </div>
  )
}
