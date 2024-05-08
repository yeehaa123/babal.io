import { createStore } from 'zustand'
import { OverlayModes } from "@/components/CourseCard/overlays";
import { immer } from 'zustand/middleware/immer'
import type { AuthData } from '@/stores/authState';
import type { Checkpoint, Course } from "@/types";
import { determineAffordances } from "@/components/CourseCard/stores/affordancesHelpers";
import { determineRole } from "@/components/CourseCard/stores/roleHelpers";

export interface StoreProps { courses: Course[], authData: AuthData }

export interface CoreState {
  overlayMode: OverlayModes,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

export type Affordances = {
  canAuthenticate: boolean,
  canEdit: boolean,
  canTakeNotes: boolean,
  canClone: boolean,
  canCheckComplete: boolean,
  canBookmark: boolean
}
export type CourseCardStore = {
  course: Course,
  checkpoint: Checkpoint | undefined,
  cardState: CoreState,
  affordances: Affordances
}

export type OffcourseStore = ReturnType<typeof createOffcourseStore>

function createCardStore(course: Course, authData: AuthData) {
  let checkpoint;
  const { userName } = authData;
  const cardState = {
    overlayMode: OverlayModes.NOTE,
    course,
    checkpoint,
    isBookmarked: !!userName,
    isMetaVisible: false,
  }
  const role = determineRole({ cardState, course, authData });
  const affordances = determineAffordances(role);
  return {
    course,
    checkpoint,
    cardState,
    affordances
  }
}


export function createOffcourseStore({ courses, authData }: StoreProps) {
  return createStore<{ stores: Record<string, CourseCardStore>, actions: any }>()(immer(
    (set) => {
      const storeEntries = courses.map(course => {
        const cardStore = createCardStore(course, authData);
        return [course.id, cardStore]
      });
      const stores = Object.fromEntries(storeEntries);
      const actions = {
        hideCheckpoint: (courseId: string) => {
          set((state) => {
            if (state.stores[courseId]) {
              state.stores[courseId]!.cardState.overlayMode = OverlayModes.NONE
            }
          })
        },
        toggleBookmark: (courseId: string) => {
          set((state) => {
            if (state.stores[courseId]) {
              state.stores[courseId]!.cardState.isBookmarked
                = !state.stores[courseId]!.cardState.isBookmarked
            }
          })

        }
      }

      return {
        stores,
        actions
      }
    }))
}
