import type { Actions, Affordances, Course } from "./types";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card"
import BookmarkIcon from "./BookmarkIcon";
import Checkpoint from "@/components/Checkpoint";
import CardMeta from "./CardMeta"
import Toolbar from "./Toolbar"
import CuratorSection from './Curator';


type Props = {
  course: Course,
  actions: Actions,
  affordances: Affordances,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

export default function CourseCard({
  course,
  actions,
  affordances,
  isBookmarked,
  isMetaVisible
}: Props) {
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
    toggleComplete,
    toggleMetaVisible,
  } = actions;
  return (
    <>
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-between space-x-5 ">
          {goal}
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
              canCheckComplete={canCheckComplete} key={index} {...cp} goal={goal} />))
          }
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4">
        <Toolbar affordances={affordances} actions={actions} habitat={habitat} />
      </CardFooter>
    </ >
  )
}
