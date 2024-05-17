import type { CourseCardStore } from "@/offcourse/stores/card/types";
import { OverlayModes } from "@/offcourse/stores/card/types";
import {
  CheckpointOverlay,
  AuthOverlay,
  MockOverlay,
  CloneOverlay,
  NoteOverlay
} from "@/offcourse/components/overlays";

export default function Overlay(props: CourseCardStore) {
  const overlayMode = props.cardState.overlayMode!
  const Overlay = {
    [OverlayModes.NONE]: MockOverlay,
    [OverlayModes.NOTE]: NoteOverlay,
    [OverlayModes.REGISTER]: MockOverlay,
    [OverlayModes.AUTH]: AuthOverlay,
    [OverlayModes.EDIT]: MockOverlay,
    [OverlayModes.SHARE]: MockOverlay,
    [OverlayModes.CLONE]: CloneOverlay,
    [OverlayModes.CHECKPOINT]: CheckpointOverlay,
  }[overlayMode]
  return <Overlay {...props} />
}
