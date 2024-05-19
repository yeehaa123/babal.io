import type { AugmentedCheckpoint, CheckpointQuery } from "@/offcourse/types";

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/offcourse/components"

interface Props extends AugmentedCheckpoint {
  canCheckComplete: boolean,
  toggleCheck: (query: CheckpointQuery) => void
  showCheckpoint: (query: CheckpointQuery) => void
}

export default function Checkpoint({
  task,
  courseId,
  checkpointId,
  isCompleted,
  toggleCheck,
  showCheckpoint,
  canCheckComplete }: Props) {
  return (
    <li className="group flex align-middle bg-gray-100 
    hover:bg-gray-900 hover:text-white p-3 flex items-center space-x-2">
      <Checkbox
        checked={!!isCompleted}
        disabled={!canCheckComplete}
        id={`${courseId}-${task}`}
        onClick={() => toggleCheck({ courseId, checkpointId })} />
      <Label htmlFor={`${courseId}-${task}`}>
        <button onClick={() => showCheckpoint({ courseId, checkpointId })}>{task}</button>
      </Label>
    </li>
  )
}
