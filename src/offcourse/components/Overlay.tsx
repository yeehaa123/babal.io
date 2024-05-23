import type { CourseCardStore } from "@/offcourse/stores/types";

import { OverlayModes } from "@/offcourse/types";
import { Transition } from "@headlessui/react"
import { CardChrome } from "@/offcourse/components";
import {
  CheckpointOverlay,
  AuthOverlay,
  MockOverlay,
  CloneOverlay,
  NoteOverlay
} from "@/offcourse/components/overlays";

export default function Overlay(props: CourseCardStore) {
  const overlayMode = props.cardState.overlayMode;
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
  return (
    <Transition
      as={CardChrome}
      show={overlayMode !== OverlayModes.NONE}
      enter="ease-out duration-200"
      enterFrom="translate-y-full opacity-80"
      enterTo="translate-y-0 z-10 opacity-95"
      leave="ease-in duration-200"
      leaveFrom="translate-y-0 opacity-95"
      leaveTo="translate-y-full opacity-80" >
      <Overlay {...props} />
    </Transition>)
}
