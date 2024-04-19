import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Curator from '@/components/Curator';


import { Share1Icon, CopyIcon, BookmarkIcon } from '@radix-ui/react-icons'


import Checkpoint from "@/components/Checkpoint";

type Checkpoint = {
  task: string,
  href: string
}

type Socials = {
  linkedin?: string,
}

type Curator = {
  alias: string,
  socials: Socials
}

interface Course {
  goal: string,
  description: string,
  checkpoints: Checkpoint[],
  curator: string,
}

interface Props {
  course: Course,
  curator: Curator | undefined
}

export default function CourseCard({ course, curator }: Props) {
  const { goal, description, curator: name, checkpoints } = course

  return (
    <Card className="w-auto max-w-[380px]">
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-end space-x-5 ">
          {goal}
          <BookmarkIcon className="h-8 w-8 text-gray-500" />
        </CardTitle>

        <Curator name={name} socials={curator && curator.socials} />
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {checkpoints.map((cp, index) => (
            <Checkpoint key={index} {...cp} index={index} />
          ))
          }
        </ul>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="flex w-full justify-end space-x-5 ">
          <CopyIcon className="h-4 w-4 text-gray-500" />
          <Share1Icon className="h-4 w-4 text-gray-500" />
        </div>
      </CardFooter>
    </Card>
  )
}

