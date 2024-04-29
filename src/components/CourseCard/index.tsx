import type { Course } from "@/types";
import { OverlayModes } from "./types"
import useCardStore from "./stores"
import { Card } from "@/components/ui/card"
import CourseContent from "./CourseContent";
import {
  SignInOverlay,
  EditOverlay,
  CheckpointOverlay,
  MockOverlay,
  NoteOverlay,
  CloneOverlay
} from "./overlays"

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
    [OverlayModes.CHECKPOINT]: CheckpointOverlay,
    [OverlayModes.CLONE]: CloneOverlay,
  }[props.overlayMode]
  return <Comp {...props} />
}

export default function CourseCard(course: Course) {
  const {
    affordances,
    overlayMode,
    actions,
    isMetaVisible,
    isBookmarked,
  } = useCardStore(course);

  const {
    hideOverlay,
    authenticate
  } = actions;
  const isVisible = overlayMode !== OverlayModes.NONE;

  return <Card
    className="relative w-auto max-w-[380px] select-none 
    min-h-[500px] h-full w-full flex flex-col justify-between">
    {isVisible
      ? <OverlayData
        overlayMode={overlayMode}
        onCancel={hideOverlay}
        onConfirm={authenticate} />
      : <CourseContent
        isBookmarked={isBookmarked}
        isMetaVisible={isMetaVisible}
        course={course}
        affordances={affordances}
        actions={actions} />
    }
  </Card >
}
