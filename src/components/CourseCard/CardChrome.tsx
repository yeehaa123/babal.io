import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode,
}

export default function CardChrome({ children }: Props) {
  return (
    <Card className="relative max-w-[380px] min-w-[380px] select-none 
    min-h-[650px] h-full w-full flex flex-col justify-between" >
      {children}
    </Card >)
}
