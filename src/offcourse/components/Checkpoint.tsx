import type { Checkpoint } from "@/offcourse/types";

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/offcourse/components"
import type { CourseCardStore } from "../stores/types";

interface Props extends Checkpoint {
  canCheckComplete: CourseCardStore['affordances']['canCheckComplete'],
  toggleComplete: CourseCardStore['actions']['toggleComplete']
  showCheckpoint: CourseCardStore['actions']['showCheckpointOverlay']
}

export default function Checkpoint({
  task,
  courseId,
  checkpointId,
  isCompleted,
  toggleComplete,
  showCheckpoint,
  canCheckComplete }: Props) {
  const taskId = `${courseId}-${task}`
  return (
    <li className="group flex align-middle bg-gray-100 
    hover:bg-gray-900 hover:text-white p-3 flex items-center space-x-2">
      <Checkbox
        checked={!!isCompleted}
        disabled={!canCheckComplete}
        id={`${courseId}-${task}`}
        onClick={() => toggleComplete({ courseId, checkpointId })} />
      <Label htmlFor={taskId}>
        <button onClick={() => showCheckpoint({ courseId, checkpointId })}>{task}</button>
      </Label>
    </li>
  )
}
