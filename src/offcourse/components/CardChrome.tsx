import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode,
}

export default function CardChrome({ children }: Props) {
  return (
    <Card className="grid h-auto row-span-3 select-none" >
      {children}
    </Card >)
}
