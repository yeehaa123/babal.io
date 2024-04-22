import { cn } from "@/lib/utils"

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Socials = {
  linkedin?: string,
}

type Curator = {
  alias: string,
  socials: Socials
}

import Curator from '@/components/Curator';

interface Props {
  goal: string,
  description: string,
  curator: Curator,
  isBookmarked: boolean,
  toggleBookmark: () => void
}

import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'

export default function CourseCard({ goal, description,
  curator, isBookmarked, toggleBookmark }: Props) {
  const { alias, socials } = curator;
  return (
    <CardHeader className="space-y-4">
      <CardTitle className="flex w-full justify-between space-x-5 ">
        {goal}
        {isBookmarked ?
          <BookmarkFilledIcon onClick={toggleBookmark} className={
            cn("h-8 w-8 text-gray-500")} /> :
          <BookmarkIcon onClick={toggleBookmark} className={
            cn("h-8 w-8 text-gray-500")} />}
      </CardTitle>
      <Curator alias={alias} socials={socials} />
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  )
}
