import type { CourseCardStore } from "@/offcourse/stores/types";
import { useOffCourseAuth } from "@/offcourse/stores/auth";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "../";
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"


export default function UserOverlay({ authData, cardState, actions }: CourseCardStore) {
  const { userName } = authData;
  const { courseId } = cardState;
  const { hideOverlay } = actions;
  const { signOut } = useOffCourseAuth();
  return (
    <>
      <CardHeader className="flex flex-row gap-x-7 space-y-0 items-center justify-start">
        <Avatar className="w-12 h-12">
          <AvatarImage userName={userName!} saturation={100} lightness={100} />
          <AvatarFallback className="bg-indigo-600 text-white">YH</AvatarFallback>
        </Avatar>
        <CardTitle className="capitalize">{userName}</CardTitle>
      </CardHeader>
      <CardContent className="flex grow" >
      </CardContent>
      <CardFooter className="flex w-full justify-between gap-x-2">
        <Button onClick={() => signOut()} className="w-full">Sign Out</Button>
        <Button onClick={() => hideOverlay({ courseId })} className="w-full">Cancel</Button>
      </CardFooter>
    </>
  )
}
