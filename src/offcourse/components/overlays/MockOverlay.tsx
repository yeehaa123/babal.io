import type { CourseCardStore } from "@/offcourse/types";

import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"


export default function MockOverlay({ course, cardState, actions }: CourseCardStore) {
  const { courseId } = course;
  const { overlayMode } = cardState;
  const { hideCheckpoint } = actions;

  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{overlayMode} </CardTitle>
      </CardHeader>
      <CardContent className="flex grow" />
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => hideCheckpoint({ courseId })} className="w-full">Cancel</Button>
      </CardFooter>
    </>
  )
}
