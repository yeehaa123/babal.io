import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import type { CourseCardStore } from "../stores"

import CardChrome from "../CardChrome";

export default function CheckpointOverlay({ actions }: CourseCardStore) {
  const { hideCheckpoint, authenticate } = actions;
  return (
    <CardChrome>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={authenticate} className="w-full">Sign In</Button>
        <Button onClick={hideCheckpoint} className="w-full">Cancel</Button>
      </CardFooter>
    </CardChrome>

  )
}
