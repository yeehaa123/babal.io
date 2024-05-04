import { useStore } from '@nanostores/react';
import { useState } from 'react';

import type { Course } from "@/types";
import type { Actions } from "./actions";
import type { Affordances, AugmentedState } from "./augmentedStore";
import type { CoreStore, CoreState } from "./coreStore";

import { initialize } from "./coreStore";
import { initialize as augment } from "./augmentedStore";

type CourseCardStore = {
  state: AugmentedState,
  actions: Actions,
  affordances: Affordances,
}

export function useCourseCardStore({ course }: { course: Course }): CourseCardStore {
  const $coreState = initialize({ course });
  const $roleState = augment($coreState);
  const [$state] = useState($roleState);
  return useStore($state);
}

export type { CoreState, CoreStore, CourseCardStore, Affordances, Actions }
