import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tags } from "@/offcourse/components/Tags"
import {
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import CardChrome from "../CardChrome";
import Checkbox from "@/offcourse/components/Checkbox"
import type { CourseCardStore } from "..";

export default function CheckpointOverlay({ checkpoint, affordances, actions }: CourseCardStore) {
  const { canCheckComplete } = affordances;
  const { courseId, isCompleted, task, description, href, tags } = checkpoint!;
  const { hideCheckpoint, toggleComplete } = actions;
  return (
    <CardChrome>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{task}</CardTitle>
        <Checkbox id={`${courseId}-${task}`}
          checked={!!isCompleted}
          disabled={!canCheckComplete}
          className={cn("h-12 w-12 mt-0")}
          onClick={toggleComplete} />
      </CardHeader>
      <CardContent className="space-y-4 grow flex flex-col justify-center">
        <Tags tags={tags} />
        <CardDescription>{description}</CardDescription>
        <a href={href}
          onClick={hideCheckpoint}
          className="flex text-xs items-center text-left text-gray-900">
          <ExternalLinkIcon className="mr-2 w-5 h-5" />
          <span className="break-words max-w-[90%]">{href}</span></a>
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => {
          console.log(courseId)
          hideCheckpoint(courseId)
        }} className="w-full">Close</Button>
      </CardFooter>
    </CardChrome>

  )
}
