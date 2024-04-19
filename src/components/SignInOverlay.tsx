import { cn } from "@/lib/utils"


import {
  CardContent,
  CardTitle,
} from "@/components/ui/card"




interface Props {
  isOverlayVisible: boolean,
  toggleOverlay: () => void
}


export default function SignInOverlay({ isOverlayVisible, toggleOverlay }: Props) {
  return (
    <div
      onClick={toggleOverlay}
      className={cn("absolute top-0 h-full w-full flex justify-center items-center", {
        "bg-white/95": isOverlayVisible,
        "opacity-0": !isOverlayVisible,
        "pointer-events-none": !isOverlayVisible,
        "z-10": isOverlayVisible
      })}>
      <CardContent className="space-y-4">
        <CardTitle className="flex w-full space-x-5 ">
          Sign In
        </CardTitle>
      </CardContent>
    </div>
  )
}
