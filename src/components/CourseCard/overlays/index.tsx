import type { CourseCardStore } from "..";
import CheckpointOverlay from "./CheckpointOverlay";
import AuthOverlay from "./AuthOverlay";
import MockOverlay from "./MockOverlay";
import CloneOverlay from "./CloneOverlay";
import { NoteOverlay } from "./NoteOverlay";

export enum OverlayModes {
  NONE = "NONE",
  AUTH = "AUTH",
  REGISTER = "REGISTER",
  EDIT = "EDIT",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  SHARE = "SHARE",
  CLONE = "CLONE"
}

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
