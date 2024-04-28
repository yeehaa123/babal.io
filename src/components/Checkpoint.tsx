import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export interface Props {
  task: string,
  href: string,
  index: number,
  isCheckable: boolean,
  toggleCheck: () => void
  showCheckpoint: () => void
}

export default function Checkpoint({ task, index, toggleCheck, showCheckpoint, isCheckable }: Props) {
  return (
    <li className="group flex align-middle bg-gray-100 hover:bg-gray-900 hover:text-white p-3 flex items-center space-x-2">
      <Checkbox className={cn("bg-white", { "invisible": !isCheckable })} id={`cp-${index}`} onClick={() => toggleCheck()} />
      <Label htmlFor={`cp-${index}`}>
        <button onClick={showCheckpoint}>{task}</button>
      </Label>
    </li>
  )
}
