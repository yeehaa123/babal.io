import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Avatar from '@/components/Curator';


import { Share1Icon, CopyIcon, BookmarkIcon } from '@radix-ui/react-icons'


import Checkpoint from "@/components/Checkpoint";

type Checkpoint = {
  task: string,
  href: string
}

interface Props {
  goal: string,
  description: string,
  checkpoints: Checkpoint[],
  curator: string
}

export default function CourseCard({ goal, description, checkpoints, curator }: Props) {
  return (
    <Card className="w-[360px]">
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-end space-x-5 ">
          {goal}
          <BookmarkIcon className="h-8 w-8 text-gray-500" />
        </CardTitle>

        <Avatar curator={curator} />
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

