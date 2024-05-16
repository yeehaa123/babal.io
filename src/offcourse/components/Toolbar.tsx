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

import type { Affordances } from "@/offcourse/stores/card/types"

type Actions = {
  signIn: () => void,
  signOut: () => void,
  showCloneOverlay: () => void,
  showShareOverlay: () => void,
  showEditOverlay: () => void,
  showNotesOverlay: () => void
}

type Props = {
  habitat?: string | undefined,
  actions: Actions,
  affordances: Affordances,
}

export default function Toolbar({
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
        <EnterIcon onClick={signIn}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canAuthenticate })} />
        <ExitIcon onClick={signOut}
          className={cn("h-4 w-4 text-gray-500", { "hidden": canAuthenticate })} />
        <Pencil1Icon onClick={showEditOverlay}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canEdit })} />
        <Pencil2Icon onClick={showNotesOverlay}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canTakeNotes })} />
        <CopyIcon onClick={showCloneOverlay}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !canClone })} />
      </div>
      <div className="flex gap-x-4 ">
        <a href={habitat} className={cn("invisible", { "visible": habitat })}>
          <Crosshair1Icon className="h-4 w-4 text-gray-500" />
        </a>
        <Share1Icon onClick={showShareOverlay} className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  )
}
