import {
  CardDescription,
} from "@/components/ui/card"
import OverlayChrome from "./OverlayChrome"
import { OverlayModes } from "../types";
import type { Actions, Affordances, Checkpoint, Course } from "../types";

type Props = {
  course: Course,
  checkpoint: Checkpoint | undefined,
  isAuthenticated: boolean,
  overlayMode: OverlayModes,
  actions: Actions,
  affordances: Affordances,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

function MockContent({ data }: any) {
  return <CardDescription>
    {JSON.stringify(data, null, 2)}
  </CardDescription>
}


function determineOverlayState({ isAuthenticated, overlayMode, checkpoint, actions }: Props) {
  const { authenticate, signOut, hideCheckpoint } = actions;
  const title = overlayMode || "DEFAULT";
  const onCancel = isAuthenticated ? signOut : hideCheckpoint;
  const onConfirm = authenticate;
  const canConfirm = overlayMode === OverlayModes.AUTH;

  const OverlayContent = {
    [OverlayModes.NOTE]: <MockContent data={{}} />,
    [OverlayModes.AUTH]: <MockContent data={{}} />,
    [OverlayModes.EDIT]: <MockContent data={{}} />,
    [OverlayModes.CLONE]: <MockContent data={{}} />,
    [OverlayModes.CHECKPOINT]: <MockContent data={checkpoint} />,
  }[overlayMode]

  return { title, onCancel, onConfirm, canConfirm, OverlayContent }
}

export default function Overlay(props: Props) {
  const { title, onCancel, onConfirm, canConfirm, OverlayContent } = determineOverlayState(props)
  return (
    <OverlayChrome title={title} onCancel={onCancel} canConfirm={canConfirm} onConfirm={onConfirm}>
      {OverlayContent}
    </OverlayChrome >
  )
}

