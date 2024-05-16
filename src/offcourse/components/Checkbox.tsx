import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

type Props = {
  id: string,
  disabled: boolean,
  checked: boolean,
  onClick: () => void;
  className?: string
}

export default function CB({ id, checked, disabled, onClick, className }: Props) {
  return <Checkbox
    className={cn("bg-gray-50", className, { "invisible": disabled, "bg-gray-800": checked })}
    checked={checked}
    id={id}
    onClick={onClick} />
}