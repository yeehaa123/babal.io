import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card"

import CardChrome from "./CardChrome";
import BookmarkIcon from "./BookmarkIcon";
import Checkpoint from "@/components/Checkpoint";
import CardMeta from "./CardMeta"
import Toolbar from "./Toolbar"
import CuratorSection from './Curator';
import type { CourseCard } from ".";
import { toggleComplete } from "@/stores/learnData"

export default function CourseCard({
  course,
  cardState,
  actions,
  affordances,
}: CourseCard) {
  console.log(course.id);
  const {
    isBookmarked,
    isMetaVisible
  } = cardState;

  const {
    goal,
    curator,
    checkpoints,
    description,
    habitat
  } = course;

  const {
    canCheckComplete,
    canBookmark,
  } = affordances;

  const {
    toggleBookmark,
    showCheckpoint,
    toggleMetaVisible,
  } = actions;

  return <CardChrome>
    <CardHeader className="space-y-4">
      <CardTitle className="flex w-full justify-between space-x-5 ">
        <span className="max-w-[80%]">{goal}</span>
        <BookmarkIcon onClick={toggleBookmark}
          isBookmarked={isBookmarked}
          canBookmark={canBookmark} />
      </CardTitle>
      <CuratorSection {...curator} />
      {isMetaVisible
        ? <CardMeta onClick={toggleMetaVisible} id={goal} />
        : <CardDescription onClick={toggleMetaVisible}>{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <ul className="flex flex-col gap-2">
        {checkpoints.map((cp, index) => (
          <Checkpoint toggleCheck={toggleComplete}
            showCheckpoint={showCheckpoint}
            canCheckComplete={canCheckComplete} key={index} {...cp} />))
        }
      </ul>
    </CardContent>
    <CardFooter className="flex flex-col gap-y-4">
      <Toolbar affordances={affordances} actions={actions} habitat={habitat} />
    </CardFooter>
  </CardChrome>
}
