import { cn } from "@/lib/utils"


import {
  CardContent,
  CardTitle,
} from "@/components/ui/card"




interface Props {
  isVisible: boolean,
  toggle: () => void
}


export default function SignInOverlay({ isVisible, toggle }: Props) {
  return (
    <div
      onClick={toggle}
      className={cn("absolute top-0 h-full w-full flex justify-center items-center", {
        "bg-white/95": isVisible,
        "opacity-0": !isVisible,
        "pointer-events-none": !isVisible,
        "z-10": isVisible
      })}>
      <CardContent className="space-y-4">
        <CardTitle className="flex w-full space-x-5 ">
          Sign In
        </CardTitle>
      </CardContent>
    </div>
  )
}
