import {
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { OverlayModes } from "../types";
import CheckpointOverlay from "./CheckpointOverlay";
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
  const formId = undefined;

  const OverlayContent = {
    [OverlayModes.NOTE]: <MockContent data={{}} />,
    [OverlayModes.AUTH]: <MockContent data={{}} />,
    [OverlayModes.EDIT]: <MockContent data={{}} />,
    [OverlayModes.CLONE]: <MockContent data={{}} />,
    [OverlayModes.CHECKPOINT]: <CheckpointOverlay checkpoint={checkpoint!} />,
  }[overlayMode]

  return { title, onCancel, onConfirm, formId, canConfirm, OverlayContent }
}

export default function Overlay(props: Props) {
  const { title, onCancel, onConfirm, canConfirm, formId, OverlayContent } = determineOverlayState(props)
  return (
    <>
      <CardHeader>
        <CardTitle className="flex">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 grow flex flex-col justify-center">
        {OverlayContent}
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        {formId && <Button type="submit" form={formId} className="w-full">Submit</Button>}
        {canConfirm && <Button onClick={onConfirm} className="w-full">Submit</Button>}
        <Button onClick={onCancel} className="w-full">Cancel</Button>
      </CardFooter>
    </>
  )
}

