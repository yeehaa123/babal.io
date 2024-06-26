import type { Course } from "@/offcourse/types";
import { useEffect, } from "react"
import type { ReactElement } from 'react';
import { ClerkProvider } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import type { OffcourseStore } from "@/offcourse/stores"
import { useRef } from "react"
import { useShallow } from 'zustand/react/shallow'
import { OffcourseContext, useOffcourseContext } from "@/offcourse/stores/context";
import { createOffcourseStore } from "@/offcourse/stores"
import { CourseCard } from "."


type CollectionProps = {
  courses: Course[],
  standAlone?: boolean
}

interface ProviderProps {
  courses: Course[],
  children: ReactElement | ReactElement[]
}

const StoreProvider = ({ children, courses }: ProviderProps) => {
  const storeRef = useRef<OffcourseStore>()
  if (!storeRef.current) {
    storeRef.current = createOffcourseStore({ courses });
  }
  return (
    <OffcourseContext.Provider value={storeRef.current}>
      {children}
    </OffcourseContext.Provider>
  )
}

function InnerCollection() {
  const courseIds = useOffcourseContext(useShallow((state) => Object.keys(state.courses)))
  const { isSignedIn, user, isLoaded } = useUser();
  const { updateUser } = useOffcourseContext((state) => state.actions);
  const userName = user?.username || undefined;
  useEffect(() => {
    if (isSignedIn) {
      updateUser({ userName });
    }
  }, [isLoaded, isSignedIn, userName])
  return (
    <div
      className="grid justify-center items-start gap-4 gap-y-8 m-2 
      grid-cols-[repeat(auto-fit,minmax(340px,400px))]">
      {courseIds.map((id) =>
        <CourseCard key={id} courseId={id} />)}
    </div>)
}

export default function CourseCollection({ courses }: CollectionProps) {
  const PUBLISHABLE_KEY = import.meta.env.PUBLIC_CLERK_KEY;
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  return (
    <ClerkProvider clerkJSVariant="headless" publishableKey={PUBLISHABLE_KEY}>
      <StoreProvider courses={courses}>
        <InnerCollection />
      </StoreProvider>
    </ClerkProvider>
  )
}
