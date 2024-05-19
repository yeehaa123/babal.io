import type { Affordances } from "@/offcourse/types"

import { cn } from "@/lib/utils"
import {
  EnterIcon,
  ExitIcon,
  Share1Icon,
  Crosshair1Icon,
  CopyIcon,
  Pencil1Icon,
  Pencil2Icon,
} from '@radix-ui/react-icons'
import type { Course, CourseQuery } from "../types"


type Actions = {
  signIn: (query: CourseQuery) => void,
  signOut: () => void,
  showCloneOverlay: (query: CourseQuery) => void,
  showShareOverlay: (query: CourseQuery) => void,
  showEditOverlay: (query: CourseQuery) => void,
  showNotesOverlay: (query: CourseQuery) => void
}

type Props = {
  courseId: Course['courseId'],
  habitat?: string | undefined,
  actions: Actions,
  affordances: Affordances,
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
    signIn,
    signOut,
    showEditOverlay,
    showShareOverlay,
    showNotesOverlay,
    showCloneOverlay
  } = actions;
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-start gap-x-4 ">
        <EnterIcon onClick={() => signIn({ courseId })}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canAuthenticate })} />
        <ExitIcon onClick={signOut}
          className={cn("h-4 w-4 text-gray-500", { "hidden": canAuthenticate })} />
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
