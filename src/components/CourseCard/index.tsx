import type {
  Course
} from "@/types";


import {
  Card,
} from "@/components/ui/card"

import useCardStore from "./CourseCardStore"
import SignInOverlay from "@/components/SignInOverlay";
import CardHeader from "./CourseCardHeader"
import CardFooter from "./CourseCardFooter"
import CardContent from "./CourseCardContent"


export default function CourseCard({
  goal,
  description,
  habitat,
  curator,
  checkpoints
}: Course) {
  const {
    isOverlayVisible,
    isBookmarked,
    closeOverlay,
    toggleBookmark,
    setBookmark
  } = useCardStore();
  return (
    <Card className="relative w-auto max-w-[380px] select-none">
      <SignInOverlay isVisible={isOverlayVisible} toggle={closeOverlay} />
      <CardHeader goal={goal} description={description} curator={curator}
        isBookmarked={isBookmarked} toggleBookmark={toggleBookmark} />
      <CardContent checkpoints={checkpoints} toggleComplete={setBookmark} />
      <CardFooter habitat={habitat} cloneCourse={setBookmark} />
    </Card >
  )
}
