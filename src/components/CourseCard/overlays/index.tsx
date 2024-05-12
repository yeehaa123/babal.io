import type { CourseCardStore } from "..";
import CheckpointOverlay from "./CheckpointOverlay";
import AuthOverlay from "./AuthOverlay";
import MockOverlay from "./MockOverlay";
import CloneOverlay from "./CloneOverlay";
import { NoteOverlay } from "./NoteOverlay";

export enum OverlayModes {
  NONE = "NONE",
  AUTH = "AUTH",
  EDIT = "EDIT",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  CLONE = "CLONE"
}

export default function Overlay(props: CourseCardStore) {
  const overlayMode = props.cardState.overlayMode!
  const Overlay = {
    [OverlayModes.NONE]: MockOverlay,
    [OverlayModes.NOTE]: NoteOverlay,
    [OverlayModes.AUTH]: AuthOverlay,
    [OverlayModes.EDIT]: MockOverlay,
    [OverlayModes.CLONE]: CloneOverlay,
    [OverlayModes.CHECKPOINT]: CheckpointOverlay,
  }[overlayMode]
  return <Overlay {...props} />
}
