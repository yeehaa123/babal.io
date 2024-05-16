import type { CourseCardStore } from "@/offcourse/stores/card/types";

import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card"

import { CardChrome } from "./CourseCard";
import { Bookmark } from "./Bookmark";
import { Checkpoint } from "./Checkpoint";
import { CardMeta } from "./CardMeta"
import { Toolbar } from "./Toolbar"
import { Curator } from './Curator';
import { Tags } from "./Tags"

export default function CourseCard({
  course,
  cardState,
  actions,
  affordances,
}: CourseCardStore) {
  const {
    isMetaVisible
  } = cardState;

  const {
    isBookmarked,
    courseId,
    goal,
    curator,
    checkpoints,
    description,
    tags,
    habitat
  } = course;

  const {
    canCheckComplete,
    canBookmark,
  } = affordances;

  const {
    showCheckpoint,
    toggleComplete,
    toggleBookmark,
    toggleMetaVisible
  } = actions;

  return <CardChrome>
    <CardHeader className="space-y-4">
      <CardTitle className="flex w-full justify-between space-x-5 ">
        <span className="max-w-[80%]">{goal}</span>
        <Bookmark onClick={() => {
          toggleBookmark({ courseId })
        }}
          isBookmarked={isBookmarked}
          canBookmark={canBookmark} />
      </CardTitle>
      <Curator {...curator} />
      {isMetaVisible
        ? <CardMeta onClick={toggleMetaVisible} id={goal} />
        : <CardDescription onClick={toggleMetaVisible}>{description}</CardDescription>}
      <Tags tags={tags} />
    </CardHeader>
    <CardContent>
      <ul className="flex flex-col gap-2">
        {checkpoints.map((cp, index) => (
          <Checkpoint toggleCheck={() => toggleComplete({ courseId, checkpointId: index })}
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