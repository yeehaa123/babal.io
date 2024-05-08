import type { Course } from "@/types";
import { useStore as useNano } from "@nanostores/react";

import CourseCard from "@/components/CourseCard"
import { OffcourseContext, StoreProvider } from "@/containers/Offcourse"
import { useStore } from "zustand";
import { useContext } from "react";
import { $authState } from "@/stores/authState";

export type CollectionProps = { courses: Course[] }

function Collection() {
  const store = useContext(OffcourseContext)
  if (!store) {
    throw new Error('Missing StoreProvider')
  }
  const { stores, actions } = useStore(store)
  const xstores = Object.entries(stores);
  return <>{xstores.map(([key, store]) => (
    <CourseCard key={key} store={{ ...store, actions }} />))}</>

}

export default function CourseCollection({ courses }: CollectionProps) {
  const authData = useNano($authState);
  return (
    <StoreProvider courses={courses} authData={authData}>
      <Collection />
    </StoreProvider>
  )
}
