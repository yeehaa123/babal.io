import { cn } from "@/lib/utils"

import {
  CardFooter,
} from "@/components/ui/card"

interface Props {
  habitat?: string | undefined,
  cloneCourse: () => void
}

import { Share1Icon, CopyIcon, Crosshair1Icon } from '@radix-ui/react-icons'

export default function CourseCard({ habitat, cloneCourse }: Props) {
  return (
    <CardFooter className="flex-col">
      <div className="flex w-full justify-between">
        <a href={habitat} className={cn("invisible", { "visible": habitat })}>
          <Crosshair1Icon className="h-4 w-4 text-gray-500" />
        </a>
        <div className="flex space-x-5 ">
          <CopyIcon onClick={cloneCourse} className={cn("h-4 w-4 text-gray-500")} />
          <Share1Icon className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </CardFooter>
  )
}
