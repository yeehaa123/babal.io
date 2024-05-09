import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { AuthData } from '@/stores/authState';
import type { Checkpoint, Course } from "@/types";
import { OverlayModes } from "@/components/CourseCard/overlays";
import { determineAffordances } from "@/components/CourseCard/stores/affordancesHelpers";
import type { Affordances } from "@/components/CourseCard/stores/affordancesHelpers";
import { determineRole } from "@/components/CourseCard/stores/roleHelpers";


export interface StoreProps { courses: Course[], authData: AuthData }


export interface AugmentedCourse extends Course {
  isBookmarked: boolean
}

export type OffcourseStore = ReturnType<typeof createOffcourseStore>


export interface CardState {
  overlayMode: OverlayModes,
  isMetaVisible: boolean
}

export type CourseCardStore = {
  course: AugmentedCourse,
  checkpoint: Checkpoint | undefined,
  authData: AuthData,
  actions: any,
  cardState: CardState,
  affordances: Affordances
}

export type OffcourseState = {
  stores: Record<string, CourseCardStore>,
  authData: AuthData,
  actions: any
}

type Props = {
  course: Course,
  authData: AuthData
}

export function createCardStore({ course: oldCourse, authData }: Props) {
  const cardState = {
    overlayMode: OverlayModes.NONE,
    isMetaVisible: false,
  }

  const course = { ...oldCourse, isBookmarked: true };

  const role = determineRole({ course, authData });
  const affordances = determineAffordances(role);
  const actions = {
    hideCheckpoint: console.log(),
    toggleBookmark: console.log()
  }

  const checkpoint = undefined;

  return { course, checkpoint, authData, cardState, affordances, actions }
};

export function createOffcourseStore({ courses, authData }: StoreProps) {
  return createStore<OffcourseState>()(immer(
    (set) => {
      const storeEntries = courses.map(course => {
        const store = createCardStore({ course, authData });
        return [course.id, store]
      });
      const actions = {
        toggleBookmark: (courseId: string) => {
          set((state) => {
            if (state.stores[courseId]) {
              state.stores[courseId]!.course.isBookmarked
                = !state.stores[courseId]!.course.isBookmarked
            }
          })
        }
      }
      return {
        stores: Object.fromEntries(storeEntries),
        authData,
        actions
      }
    }))
}
