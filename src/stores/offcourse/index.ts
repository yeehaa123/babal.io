import { createStore } from 'zustand'
import type { Course } from "@/types";
import { combine } from "zustand/middleware";
import { StoreActions } from "./actions"
import type { AugmentedCourse } from '@/components/CourseCard';

export interface StoreProps { courses: Course[] }

export type OffcourseStore = ReturnType<typeof createOffcourseStore>

export interface CourseNote {
  createdAt: Date,
  message: string
}

export type LearnData = {
  isBookmarked: boolean,
  tasksCompleted: boolean[],
  notes: CourseNote[]
}

type LearnDataState = Record<string, LearnData>

export type OffcourseState = {
  courses: Record<string, AugmentedCourse>,
  learnData: LearnDataState,
  actions: StoreActions
}

export function createOffcourseStore({ courses }: StoreProps) {
  const storeEntries = courses.map(course => {
    const tags = course.checkpoints.reduce((acc, { tags }) => {
      return new Set([...acc, ...tags])
    }, new Set)

    return [course.courseId, { ...course, tags: [...tags] }]
  });

  const initialState = {
    courses: Object.fromEntries(storeEntries),
    learnData: {}
  }
  return createStore(
    combine(initialState, (set, get) => ({ actions: new StoreActions(set, get) }))
  )
}

