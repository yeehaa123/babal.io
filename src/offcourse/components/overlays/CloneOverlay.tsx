import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import type { CourseCardStore } from "@/offcourse/stores/card/types";

import { CardChrome } from "@/offcourse/components/CourseCard";

export default function MockOverlay({ course, actions }: CourseCardStore) {
  const { courseId } = course;
  const { cloneCourse, hideOverlay } = actions;

  return (
    <CardChrome>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>Clone {course.goal}</CardTitle>
      </CardHeader>
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => {
          cloneCourse({ courseId })
        }} className="w-full">Clone</Button>
        <Button onClick={hideOverlay} className="w-full">Cancel</Button>
      </CardFooter>
    </CardChrome >

  )
}
