import type { CourseCardStore } from "../stores";
import CheckpointOverlay from "./CheckpointOverlay";
import AuthOverlay from "./AuthOverlay";
import MockOverlay from "./MockOverlay";

export enum OverlayModes {
  AUTH = "AUTH",
  EDIT = "EDIT",
  NOTE = "NOTE",
  CHECKPOINT = "CHECKPOINT",
  CLONE = "CLONE"
}

export default function Overlay(props: CourseCardStore) {
  const overlayMode = props.cardState.overlayMode!
  const Overlay = {
    [OverlayModes.NOTE]: MockOverlay,
    [OverlayModes.AUTH]: AuthOverlay,
    [OverlayModes.EDIT]: MockOverlay,
    [OverlayModes.CLONE]: MockOverlay,
    [OverlayModes.CHECKPOINT]: CheckpointOverlay,
  }[overlayMode]
  return <Overlay {...props} />
}
