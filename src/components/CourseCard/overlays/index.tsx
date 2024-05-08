import type { CourseCard } from "..";
import CheckpointOverlay from "./CheckpointOverlay";
import AuthOverlay from "./AuthOverlay";
import MockOverlay from "./MockOverlay";

export enum OverlayModes {
  NONE = "NONE",
  AUTH = "AUTH",
  EDIT = "EDIT",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  CLONE = "CLONE"
}

export default function Overlay(props: CourseCard) {
  const overlayMode = props.cardState.overlayMode!
  const Overlay = {
    [OverlayModes.NONE]: MockOverlay,
    [OverlayModes.NOTE]: MockOverlay,
    [OverlayModes.AUTH]: AuthOverlay,
    [OverlayModes.EDIT]: MockOverlay,
    [OverlayModes.CLONE]: MockOverlay,
    [OverlayModes.CHECKPOINT]: CheckpointOverlay,
  }[overlayMode]
  return <Overlay {...props} />
}
