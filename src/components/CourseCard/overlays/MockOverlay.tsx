import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import type { CourseCardStore } from "../stores"

import CardChrome from "../CardChrome";

export default function MockOverlay({ state, actions }: CourseCardStore) {
  const { overlayMode, userName } = state;
  const { hideCheckpoint } = actions;
  return (
    <CardChrome>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{overlayMode} - {userName}</CardTitle>
      </CardHeader>
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={hideCheckpoint} className="w-full">Cancel</Button>
      </CardFooter>
    </CardChrome>

  )
}
