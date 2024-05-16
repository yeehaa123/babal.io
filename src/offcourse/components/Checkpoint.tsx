import { Label } from "@/components/ui/label"
import Checkbox from "@/offcourse/components/Checkbox"

import type { AugmentedCheckpoint } from "@/offcourse/types";

interface Props extends AugmentedCheckpoint {
  canCheckComplete: boolean,
  toggleCheck: () => void
  showCheckpoint: (task: string) => void
}


export function Checkpoint({
  task,
  courseId,
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
        onClick={toggleCheck} />
      <Label htmlFor={`${courseId}-${task}`}>
        <button onClick={() => showCheckpoint(task)}>{task}</button>
      </Label>
    </li>
  )
}