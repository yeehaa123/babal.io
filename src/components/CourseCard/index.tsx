import type { Course } from "@/types";
import { cn } from "@/lib/utils"
import useCardStore from "./stores"
import { Share1Icon, CopyIcon, Pencil2Icon, Crosshair1Icon } from '@radix-ui/react-icons'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card"

import CardOverlay from "./overlays/index";
import Bookmark from "./BookmarkIcon";
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
    isClonable,
    isEditable,
    isBookmarked,
    isBookmarkable,
    isMetaVisible,
    overlayMode,
    closeOverlay,
    editCourse,
    cloneCourse,
    toggleBookmark,
    toggleComplete,
    toggleMetaVisible,
  } = useCardStore(course);
  const { alias, socials } = curator;
  return (
    <Card className="relative w-auto max-w-[380px] select-none">
      <CardOverlay close={closeOverlay} overlayMode={overlayMode} />
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-between space-x-5 ">
          {goal}
          <Bookmark toggle={toggleBookmark}
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
            <Checkpoint toggleCheck={toggleComplete} key={index} {...cp} index={index} />))
          }
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex w-full justify-between">
          <a href={habitat} className={cn("invisible", { "visible": habitat })}>
            <Crosshair1Icon className="h-4 w-4 text-gray-500" />
          </a>
          <div className="flex space-x-5 ">
            <Pencil2Icon onClick={editCourse}
              className={cn("h-4 w-4 text-gray-500", { "hidden": !isEditable })} />
            <CopyIcon onClick={cloneCourse}
              className={cn("h-4 w-4 text-gray-500", { "hidden": !isClonable })} />
            <Share1Icon className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </CardFooter>
    </Card >
  )
}
