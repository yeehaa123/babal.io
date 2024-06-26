import type { CourseCardStore } from "@/offcourse/stores/types"
import Logo from "@/offcourse/components/Logo"
import type { Course } from "@/offcourse/types"

import { cn } from "@/lib/utils"
import {
  EnterIcon,
  Share1Icon,
  Crosshair1Icon,
  CopyIcon,
  Pencil1Icon,
  Pencil2Icon,
} from '@radix-ui/react-icons'

type Props = {
  courseId: Course['courseId'],
  habitat?: Course['habitat'],
  actions: CourseCardStore['actions'],
  affordances: CourseCardStore['affordances'];
}

export default function Toolbar({
  courseId,
  habitat,
  actions,
  affordances
}: Props) {
  const {
    canAuthenticate,
    canEdit,
    canTakeNotes,
    canClone
  } = affordances;
  const {
    showAuthOverlay,
    showUserOverlay,
    showEditOverlay,
    showShareOverlay,
    showNotesOverlay,
    showCloneOverlay
  } = actions;
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-start gap-x-4 ">
        <EnterIcon onClick={() => showAuthOverlay({ courseId })}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canAuthenticate })} />
        <Logo onClick={() => showUserOverlay({ courseId })}
          className={cn("h-4 w-4 text-gray-500", { "hidden": canAuthenticate })} />
      </div>
      <div className="flex gap-x-4 ">
        <Pencil1Icon onClick={() => showEditOverlay({ courseId })}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canEdit })} />
        <Pencil2Icon onClick={() => showNotesOverlay({ courseId })}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canTakeNotes })} />
        <CopyIcon onClick={() => showCloneOverlay({ courseId })}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canClone })} />
      </div>
      <div className="flex gap-x-4 ">
        <a href={habitat} className={cn("invisible", { "visible": habitat })}>
          <Crosshair1Icon className="h-4 w-4 text-gray-500" />
        </a>
        <Share1Icon onClick={() => showShareOverlay({ courseId })} className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  )
}
