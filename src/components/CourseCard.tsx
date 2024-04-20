import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Curator from '@/components/Curator';

import SignInOverlay from "@/components/SignInOverlay";


import { Share1Icon, CopyIcon, BookmarkIcon, Crosshair1Icon } from '@radix-ui/react-icons'


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
  habitat?: string
}

interface Props {
  course: Course,
  curator?: Curator | undefined
}


export default function CourseCard({ course, curator }: Props) {
  const { goal, description, habitat, curator: name, checkpoints } = course
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  function toggleOverlay() {
    return setOverlayVisible(c => !c)
  }

  return (
    <Card className="relative w-auto max-w-[380px] select-none">
      <SignInOverlay isOverlayVisible={isOverlayVisible} toggleOverlay={toggleOverlay} />
      <CardHeader className="space-y-4">
        <CardTitle className="flex w-full justify-between space-x-5 ">
          {goal}
          <BookmarkIcon onClick={toggleOverlay} className="h-8 w-8 text-gray-500" />
        </CardTitle>

        <Curator name={name} socials={curator && curator.socials} />
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {checkpoints.map((cp, index) => (
            <Checkpoint key={index} {...cp} index={index} />
          ))
          }
        </ul>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="flex w-full justify-between">
          <a href={habitat} className={habitat ? "visible" : "invisible"}>
            <Crosshair1Icon className="h-4 w-4 text-gray-500" />
          </a>
          <div className="flex space-x-5 ">
            <CopyIcon onClick={toggleOverlay} className="h-4 w-4 text-gray-500" />
            <Share1Icon className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </CardFooter>
    </Card >
  )
}
