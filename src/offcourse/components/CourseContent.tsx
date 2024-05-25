import type { CourseCardStore } from "@/offcourse/stores/types";

import {
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card"

import {
  CardChrome,
  Toolbar,
  Curator,
  Bookmark,
  Checkpoint,
  CardMeta,
  Tags
} from "./";

export default function CourseCard({
  course,
  learnRecord,
  cardState,
  actions,
  affordances,
}: CourseCardStore) {
  const {
    isMetaVisible
  } = cardState;

  const {
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
    showCheckpointOverlay,
    toggleComplete,
    toggleBookmark,
    toggleMetaVisible
  } = actions;

  return (
    <CardChrome>
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-between space-x-5 ">
          <span className="max-w-[80%]">{goal}</span>
          <Bookmark onClick={() => {
            toggleBookmark({ courseId })
          }}
            isBookmarked={learnRecord?.isBookmarked}
            canBookmark={canBookmark} />
        </CardTitle>
        <Curator {...curator} />
        {isMetaVisible
          ? <CardMeta onClick={() => toggleMetaVisible({ courseId })} courseId={courseId} />
          : <CardDescription onClick={() => toggleMetaVisible({ courseId })}>
            {description}
          </CardDescription>}
        <Tags tags={tags} />
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {checkpoints.map((cp, index) => (
            <Checkpoint
              isCompleted={!!learnRecord?.tasksCompleted[cp.checkpointId]}
              toggleComplete={toggleComplete}
              showCheckpoint={showCheckpointOverlay}
              canCheckComplete={canCheckComplete}
              key={index}
              {...cp} />))
          }
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4">
        <Toolbar courseId={courseId} affordances={affordances}
          actions={actions} habitat={habitat} />
      </CardFooter>
    </CardChrome>
  )
}
