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
import type { Actions, Affordances } from "./types";


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
    isAuthenticable,
    isEditable,
    isNotable,
    isClonable
  } = affordances;
  const {
    signIn,
    signOut,
    editCourse,
    addNotes,
    cloneCourse
  } = actions;
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-start gap-x-4 ">
        <EnterIcon onClick={signIn}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !isAuthenticable })} />
        <ExitIcon onClick={signOut}
          className={cn("h-4 w-4 text-gray-500", { "hidden": isAuthenticable })} />
        <Pencil1Icon onClick={editCourse}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !isEditable })} />
        <Pencil2Icon onClick={addNotes}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !isNotable })} />
        <CopyIcon onClick={cloneCourse}
          className={cn("h-4 w-4 text-gray-500", { "hidden": !isClonable })} />
      </div>
      <div className="flex gap-x-4 ">
        <a href={habitat} className={cn("invisible", { "visible": habitat })}>
          <Crosshair1Icon className="h-4 w-4 text-gray-500" />
        </a>
        <Share1Icon className="h-4 w-4 text-gray-500" />
      </div>
    </div>
  )
}
