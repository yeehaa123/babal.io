import type { Course } from "@/types";
import { cn } from "@/lib/utils"
import useCardStore from "./stores"
import {
  EnterIcon,
  ExitIcon,
  Share1Icon,
  CopyIcon,
  Pencil2Icon,
  Crosshair1Icon,
} from '@radix-ui/react-icons'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card"

import CardOverlay from "./overlays/index";
import BookmarkIcon from "./BookmarkIcon";
import Checkpoint from "@/components/Checkpoint";
import CardMeta from "./CardMeta"
import CuratorSection from '@/components/Curator';

export default function CourseCard(course: Course) {
  const {
    id,
    goal,
    description,
    habitat,
    curator,
    checkpoints
  } = course;
  const {
    isAuthenticable,
    isCheckable,
    isClonable,
    isNotable,
    isEditable,
    isBookmarked,
    isBookmarkable,
    isMetaVisible,
    overlayMode,
    addNotes,
    editCourse,
    cloneCourse,
    toggleBookmark,
    toggleComplete,
    toggleMetaVisible,
    authenticate,
    signIn,
    signOut,
  } = useCardStore(course);
  const { alias, socials } = curator;
  return (
    <Card className="relative w-auto max-w-[380px] select-none">
      <CardOverlay close={() => authenticate({ userName: "Yehaa" })} overlayMode={overlayMode} />
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-between space-x-5 ">
          {goal}
          <BookmarkIcon onClick={toggleBookmark}
            isBookmarked={isBookmarked}
            isBookmarkable={isBookmarkable} />
        </CardTitle>
        <CuratorSection alias={alias} socials={socials} />
        {isMetaVisible
          ? <CardMeta onClick={toggleMetaVisible} id={id} />
          : <CardDescription onClick={toggleMetaVisible}>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {checkpoints.map((cp, index) => (
            <Checkpoint toggleCheck={toggleComplete}
              isCheckable={isCheckable} key={index} {...cp} index={index} />))
          }
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4">
        <div className="flex w-full justify-between">
          <div className="flex flex-start gap-x-4 ">
            <EnterIcon onClick={signIn}
              className={cn("h-4 w-4 text-gray-500", { "hidden": !isAuthenticable })} />
            <ExitIcon onClick={signOut}
              className={cn("h-4 w-4 text-gray-500", { "hidden": isAuthenticable })} />
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
      </CardFooter>
    </Card >
  )
}
