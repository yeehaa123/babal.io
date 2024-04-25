import type { Course } from "@/types";
import { Card } from "@/components/ui/card"
import useCardStore from "./stores"
import CardOverlay from "./overlays/index";
import CardHeader from "./CourseCardHeader"
import CardFooter from "./CourseCardFooter"
import CardContent from "./CourseCardContent"

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
  return (
    <Card className="relative w-auto max-w-[380px] select-none">
      <CardOverlay close={closeOverlay} overlayMode={overlayMode} />
      <CardHeader id={id} goal={goal} description={description} curator={curator}
        isBookmarked={isBookmarked} isBookmarkable={isBookmarkable} isMetaVisible={isMetaVisible}
        toggleMetaVisible={toggleMetaVisible} toggleBookmark={toggleBookmark} />
      <CardContent checkpoints={checkpoints} toggleComplete={toggleComplete} />
      <CardFooter habitat={habitat} isEditable={isEditable} isClonable={isClonable}
        editCourse={editCourse} cloneCourse={cloneCourse} />
    </Card >
  )
}
