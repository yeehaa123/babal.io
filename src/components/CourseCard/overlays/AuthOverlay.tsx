import { Button } from "@/components/ui/button"
import actions from "@/components/CourseCard/stores/actions"
import {
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import type { CourseCardStore } from "..";

import CardChrome from "../CardChrome";

export default function CheckpointOverlay({ }: CourseCardStore) {
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
