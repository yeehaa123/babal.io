import type { Course } from "@/types";
import { Card } from "@/components/ui/card"
import useAuthStore from "@/AuthStore"

import useCardStore from "./CourseCardStore"
import SignInOverlay from "@/components/SignInOverlay";
import CardHeader from "./CourseCardHeader"
import CardFooter from "./CourseCardFooter"
import CardContent from "./CourseCardContent"

type Props = {
  course: Course,
}

export default function CourseCard({ course }: Props) {
  const {
    id,
    goal,
    description,
    habitat,
    curator,
    checkpoints
  } = course;
  const auth = useAuthStore();
  const {
    isClonable,
    isOverlayVisible,
    isBookmarked,
    metaVisible,
    closeOverlay,
    toggleBookmark,
    toggleMetaVisible,
    setBookmark
  } = useCardStore({ course, auth });

  return (
    <Card className="relative w-auto max-w-[380px] select-none">
      <SignInOverlay isVisible={isOverlayVisible} toggle={closeOverlay} />
      <CardHeader id={id} goal={goal} description={description} curator={curator}
        isBookmarked={isBookmarked} metaVisible={metaVisible}
        toggleMetaVisible={toggleMetaVisible} toggleBookmark={toggleBookmark} />
      <CardContent checkpoints={checkpoints} toggleComplete={setBookmark} />
      <CardFooter habitat={habitat} isClonable={isClonable} cloneCourse={setBookmark} />
    </Card >
  )
}
