import type { CourseCardStore } from "@/offcourse/stores/types";

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
  const { isLoaded, isSignedIn, authenticate, signOut } = useOffCourseAuth();

  const { hideOverlay, showRegisterOverlay } = actions;
  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-top">
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="flex grow" >
        {isLoaded ?
          isSignedIn
            ? <Button onClick={() => signOut()}>Sign Out</Button>
            : <Button onClick={() => authenticate()}>SIGN IN WITH GITHUB</Button>
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
