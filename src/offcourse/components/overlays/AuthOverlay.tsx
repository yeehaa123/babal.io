import type { CourseCardStore } from "@/offcourse/stores/types";
import {
  GitHubLogoIcon,
} from '@radix-ui/react-icons'

import { Button } from "@/components/ui/button"
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { useOffCourseAuth } from "@/offcourse/stores/auth";


export default function AuthOverlay({ course, actions }: CourseCardStore) {
  const { courseId } = course;
  const { isLoaded, authenticate, } = useOffCourseAuth();

  const { hideOverlay, showRegisterOverlay } = actions;
  return (
    <>
      <CardHeader className="flex flex-col gap-x-7 space-y-0 items-top items-center">
        <div className="w-16 h-16 m-6">
          <svg viewBox="0 0 180 180">
            <path d="M0,0v180h180V0H0z M150,150H30v-30h120V150z" />
          </svg>
        </div>
        <CardTitle>Sign In to Offcourse</CardTitle>
      </CardHeader>
      <CardContent className="flex grow items-center" >
        {isLoaded ?
          <Button variant="outline" className="w-full font-normal" onClick={() => authenticate()}>
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Authenticate with Github
          </Button>
          : <div>LOADING</div>}
      </CardContent>
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => showRegisterOverlay({ courseId })}
          className="w-full">Sign Up</Button>
        <Button onClick={() => hideOverlay({ courseId })} className="w-full">Cancel</Button>
      </CardFooter>
    </>

  )
}
