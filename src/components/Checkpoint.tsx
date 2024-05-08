import { Label } from "@/components/ui/label"
import Checkbox from "@/components/Checkbox"

import type { Checkpoint } from "@/types";

interface Props extends Checkpoint {
  canCheckComplete: boolean,
  toggleCheck: (id: string) => void
  showCheckpoint: (task: string) => void
}


export default function Checkpoint({
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
        onClick={() => toggleCheck(courseId)} />
      <Label htmlFor={`${courseId}-${task}`}>
        <button onClick={() => showCheckpoint(task)}>{task}</button>
      </Label>
    </li>
  )
}
