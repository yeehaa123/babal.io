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
  name: string,
  curator?: Curator | undefined,
  isBookmarked: boolean,
  toggleBookmark: () => void
}

import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'

export default function CourseCard({ goal, description,
  curator, name, isBookmarked, toggleBookmark }: Props) {
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
      <Curator name={name} socials={curator && curator.socials} />
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  )
}
