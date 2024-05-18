import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode,
  overlayVisible?: boolean,
}

export default function CardChrome({ children, overlayVisible }: Props) {
  return (
    <Card className={cn("flex flex-col select-none h-full", { "z-10": overlayVisible })}>
      {children}
    </Card >)
}
