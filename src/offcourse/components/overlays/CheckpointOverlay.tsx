import type { CourseCardStore } from "@/offcourse/stores/types";
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  Checkbox,
  Tags
} from "@/offcourse/components";

export default function CheckpointOverlay(
  { checkpoint, learnRecord, affordances, actions }: CourseCardStore) {

  if (!checkpoint) {
    return <div>ERROR</div>
  }

  const { hideCheckpointOverlay, toggleComplete } = actions;
  const { canCheckComplete } = affordances;
  const { courseId, checkpointId, task, description, href, tags } = checkpoint;
  const isCompleted = !!learnRecord?.tasksCompleted[checkpointId]
  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{task}</CardTitle>
        <Checkbox id={`${courseId}-${task}`}
          checked={isCompleted}
          disabled={!canCheckComplete}
          className={cn("h-12 w-12 mt-0")}
          onClick={() => toggleComplete({ courseId, checkpointId })} />
      </CardHeader>
      <CardContent className="space-y-4 grow flex flex-col justify-center">
        <Tags tags={tags} />
        <CardDescription>{description}</CardDescription>
        <a href={href}
          onClick={() => hideCheckpointOverlay({ courseId })}
          className="flex text-xs items-center text-left text-gray-900">
          <ExternalLinkIcon className="mr-2 w-5 h-5" />
          <span className="break-words max-w-[90%]">{href}</span></a>
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => {
          hideCheckpointOverlay({ courseId })
        }} className="w-full">Close</Button>
      </CardFooter>
    </>
  )
}
