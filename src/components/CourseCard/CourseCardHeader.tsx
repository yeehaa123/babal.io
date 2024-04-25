import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import CardMeta from "./CardMeta"
import Bookmark from "./BookmarkIcon";
import CuratorSection from '@/components/Curator';
import type { Curator } from '@/types';

interface Props {
  id: string,
  goal: string,
  description: string,
  curator: Curator,
  isBookmarked: boolean,
  isBookmarkable: boolean,
  isMetaVisible: boolean,
  toggleMetaVisible: () => void,
  toggleBookmark: () => void
}

export default function CourseCardHeader({
  goal,
  id,
  description,
  curator,
  isBookmarked,
  isBookmarkable,
  isMetaVisible,
  toggleMetaVisible,
  toggleBookmark
}: Props) {
  const { alias, socials } = curator;
  return (
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
  )
}
