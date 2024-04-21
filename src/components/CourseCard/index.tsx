import type { CollectionEntry } from 'astro:content';

import {
  Card,
} from "@/components/ui/card"

import useCardStore from "./CourseCardStore"
import SignInOverlay from "@/components/SignInOverlay";
import CardHeader from "./CourseCardHeader"
import CardFooter from "./CourseCardFooter"
import CardContent from "./CourseCardContent"

interface Props {
  course: CollectionEntry<'courses'>['data'],
  curator?: CollectionEntry<'people'>['data'] | undefined
}

export default function CourseCard({ course, curator }: Props) {
  const { goal, description, habitat, curator: name, checkpoints } = course
  const { isOverlayVisible, closeOverlay, isBookmarked, toggleBookmark,
    setBookmark } = useCardStore();

  return (
    <Card className="relative w-auto max-w-[380px] select-none">
      <SignInOverlay isVisible={isOverlayVisible} toggle={closeOverlay} />
      <CardHeader goal={goal} description={description} name={name}
        curator={curator} isBookmarked={isBookmarked} toggleBookmark={toggleBookmark} />
      <CardContent checkpoints={checkpoints} toggleComplete={setBookmark} />
      <CardFooter habitat={habitat} cloneCourse={setBookmark} />
    </Card >
  )
}
