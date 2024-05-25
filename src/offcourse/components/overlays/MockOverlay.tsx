import type { CourseCardStore } from "@/offcourse/stores/types";

import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"


export default function MockOverlay({ cardState, actions }: CourseCardStore) {
  const { courseId, overlayMode } = cardState;
  const { hideOverlay } = actions;

  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{overlayMode} </CardTitle>
      </CardHeader>
      <CardContent className="flex grow" />
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => hideOverlay({ courseId })} className="w-full">Cancel</Button>
      </CardFooter>
    </>
  )
}
