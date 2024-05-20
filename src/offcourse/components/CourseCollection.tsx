import type { Course } from "@/offcourse/types";
import type { ReactElement } from 'react';
import type { OffcourseStore } from "@/offcourse/stores"


import { ClerkProvider, SignIn } from '@clerk/clerk-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


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
  const PUBLISHABLE_KEY = import.meta.env.PUBLIC_CLERK_KEY;


  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }

  if (!storeRef.current) {
    storeRef.current = createOffcourseStore({ courses });
  }
  return (
    <OffcourseContext.Provider value={storeRef.current}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        {children}
      </ClerkProvider>
    </OffcourseContext.Provider>
  )
}

function InnerCollection() {
  const courseIds = useOffcourseContext(
    useShallow((state) => Object.keys(state.courses)))
  return (
    <div
      className="grid justify-center items-start gap-4 gap-y-8 m-2 grid-cols-[repeat(auto-fit,minmax(340px,400px))]">
      {courseIds.map((id) =>
        <CourseCard key={id} courseId={id} />)}
    </div>)
}

export default function CourseCollection({ courses }: CollectionProps) {
  return (
    <StoreProvider courses={courses}>
      <InnerCollection />
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </StoreProvider>
  )
}
