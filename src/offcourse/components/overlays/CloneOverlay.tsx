import type { CourseCardStore } from "@/offcourse/types";

import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

export default function MockOverlay({ course, actions }: CourseCardStore) {
  const { goal, courseId } = course;
  const { cloneCourse, hideOverlay } = actions;

  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>Clone {goal}</CardTitle>
      </CardHeader>
      <CardContent className="flex grow" />
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => {
          cloneCourse({ courseId })
        }} className="w-full">Clone</Button>
        <Button onClick={() => hideOverlay({ courseId })} className="w-full">Cancel</Button>
      </CardFooter>
    </>

  )
}
