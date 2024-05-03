import {
  CardDescription
} from "@/components/ui/card"
import { OverlayModes } from "../types";
import CheckpointOverlay from "./CheckpointOverlay";
import OverlayChrome from "./OverlayChrome";
import { determineOverlayState } from "./helpers";
import type { Actions, Affordances, Checkpoint, Course } from "../types";

export type Props = {
  course: Course,
  checkpoint: Checkpoint | undefined,
  isAuthenticated: boolean,
  overlayMode: OverlayModes,
  actions: Actions,
  affordances: Affordances,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

function MockContent(props: Props) {
  const overlayState = determineOverlayState(props);
  return <OverlayChrome {...overlayState}>
    <CardDescription>
      {JSON.stringify(props.course.curator, null, 2)}
    </CardDescription>
  </OverlayChrome>
}

export default function Overlay(props: Props) {
  const Overlay = {
    [OverlayModes.NOTE]: MockContent,
    [OverlayModes.AUTH]: MockContent,
    [OverlayModes.EDIT]: MockContent,
    [OverlayModes.CLONE]: MockContent,
    [OverlayModes.CHECKPOINT]: CheckpointOverlay,
  }[props.overlayMode]
  return <Overlay {...props} />
}
