import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export interface Props {
  task: string,
  href: string,
  index: number
}

export default function Checkpoint({ task, href, index }: Props) {
  return (
    <li className="group flex align-middle bg-gray-50 hover:bg-gray-900 hover:text-white p-3 my-3 flex items-center space-x-2">
      <Checkbox className="bg-white" id={`cp-${index}`} onClick={() => console.log(task)} />
      <Label htmlFor={`cp-${index}`}>
        <a href={href} target="_blank" >
          {task}
        </a>
      </Label>
    </li>
  )
}
