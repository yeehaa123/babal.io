import type { Course } from "@/types";
import { OverlayModes } from "./types"
import useCardStore from "./stores"
import { Card } from "@/components/ui/card"
import CourseContent from "./CourseContent";
import { SignInOverlay, EditOverlay, MockOverlay, NoteOverlay, CloneOverlay } from "./overlays"

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
    authenticate
  } = actions;
  const isVisible = overlayMode !== OverlayModes.NONE;

  return <Card className="relative w-auto max-w-[380px] select-none h-full w-full flex flex-col justify-between">
    {isVisible
      ? <OverlayData
        overlayMode={overlayMode}
        onCancel={authenticate}
        onConfirm={console.log} />
      : <CourseContent
        isBookmarked={isBookmarked}
        isMetaVisible={isMetaVisible}
        course={course}
        affordances={affordances}
        actions={actions} />
    }
  </Card >
}
