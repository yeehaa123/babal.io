import { Button } from "@/components/ui/button"
import { CardChrome } from "@/offcourse/components/CourseCard";
import {
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

import type { CourseCardStore } from "@/offcourse/stores/card/types";

export default function MockOverlay({ cardState, actions }: CourseCardStore) {
  const { overlayMode } = cardState;
  const { hideCheckpoint } = actions;

  return (
    <CardChrome>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{overlayMode} </CardTitle>
      </CardHeader>
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={hideCheckpoint} className="w-full">Cancel</Button>
      </CardFooter>
    </CardChrome >

  )
}
