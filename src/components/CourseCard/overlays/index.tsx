import {
  CardDescription
} from "@/components/ui/card"

import type { StoreState } from "../stores";
import CheckpointOverlay from "./CheckpointOverlay";

import OverlayChrome from "./OverlayChrome";
import { determineOverlayState } from "./helpers";

export enum OverlayModes {
  AUTH = "AUTH",
  EDIT = "EDIT",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  CLONE = "CLONE"
}

function MockContent(props: StoreState) {
  const { course } = props.state;
  const overlayState = determineOverlayState(props);
  return <OverlayChrome {...overlayState}>
    <CardDescription>
      {JSON.stringify(course.curator, null, 2)}
    </CardDescription>
  </OverlayChrome>
}

export default function Overlay(props: StoreState) {
  const overlayMode = props.state.overlayMode!
  const Overlay = {
    [OverlayModes.NOTE]: MockContent,
    [OverlayModes.AUTH]: MockContent,
    [OverlayModes.EDIT]: MockContent,
    [OverlayModes.CLONE]: MockContent,
    [OverlayModes.CHECKPOINT]: CheckpointOverlay,
  }[overlayMode]
  return <Overlay {...props} />
}
