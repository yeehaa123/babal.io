import type { Course } from "@/offcourse/types";
import { createStore } from 'zustand'
import { combine } from "zustand/middleware";

import { useOffcourseContext } from "@/offcourse/stores/context";

import { OverlayModes } from "./card/types";
import { StoreActions } from "./actions"
import {
  determineRole,
  determineAffordances
} from "./helpers"

interface CoursesStoreProps { courses: Course[] }
export type OffcourseStore = ReturnType<typeof createOffcourseStore>

export function createOffcourseStore({ courses }: CoursesStoreProps) {
  const storeEntries = courses.map(course => {
    return [course.courseId, course]
  });

  const cardEntries = courses.map(course => {
    return [course.courseId, {
      overlayMode: OverlayModes.NONE,
      selectedCheckpoint: undefined,
      isMetaVisible: false,
    },
    ]
  })

  const initialState = {
    cardStates: Object.fromEntries(cardEntries),
    authData: { userName: undefined },
    courses: Object.fromEntries(storeEntries),
    learnData: {}
  }
  return createStore(
    combine(initialState, (set, get) => ({ actions: new StoreActions(set, get) }))
  )
}


type CourseStoreProps = {
  courseId: Course['courseId'],
}
export function useCourseCardStore({ courseId }: CourseStoreProps) {
  const actions = useOffcourseContext((state) => state.actions);
  const authData = useOffcourseContext((state) => state.authData);
  const course = useOffcourseContext((state) => state.courses[courseId]);
  const cardState = useOffcourseContext((state) => state.cardStates[courseId])!;

  if (!course) {
    return
  }

  const checkpoint = course.checkpoints.find(
    cp => cp.checkpointId === cardState.selectedCheckpoint)
  const role = determineRole({ course, authData });
  const affordances = determineAffordances(role);

  return { course, checkpoint, cardState, affordances, actions }
}
