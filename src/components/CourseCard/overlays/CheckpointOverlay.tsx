import {
  CardDescription,
} from "@/components/ui/card"

import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import CardChrome from "../CardChrome";
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import type { Props } from "./index"

export default function CheckpointOverlay({ checkpoint, actions, affordances }: Props) {
  const { canCheckComplete } = affordances;
  const { goal, task, description, isCompleted, href } = checkpoint!;
  const { hideCheckpoint, toggleComplete } = actions;
  const onCancel = actions.hideCheckpoint;
  return (
    <CardChrome>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>{task}</CardTitle>
        <Checkbox className={cn("h-12 w-12 mt-0 bg-gray-100", { "invisible": !canCheckComplete })} id={`${goal}-${task}`} onClick={() => toggleComplete()} />
      </CardHeader>
      <CardContent className="space-y-4 grow flex flex-col justify-center">
        <CardDescription>{description}</CardDescription>
        <a href={href} onClick={hideCheckpoint} className="flex text-xs items-center text-left text-gray-900">
          <ExternalLinkIcon className="mr-2 w-5 h-5" />
          <span className="break-words max-w-[90%]">{href}</span></a>
      </CardContent >
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={onCancel} className="w-full">Close</Button>
      </CardFooter>
    </CardChrome>

  )
}
