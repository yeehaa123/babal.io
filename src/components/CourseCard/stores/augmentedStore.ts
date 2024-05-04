import { computed } from 'nanostores';

import type { CoreState, CoreStore } from './';
import type { RoleTypes } from './roleHelpers';

import { determineRole } from "./roleHelpers"
import { determineAffordances } from "./affordancesHelpers"
import bindActions from "./actions";
import { $userState } from "@/stores/userData";
import type { Checkpoint, Course } from '@/types';


export type Affordances = {
  canAuthenticate: boolean,
  canEdit: boolean,
  canTakeNotes: boolean,
  canClone: boolean,
  canCheckComplete: boolean,
  canBookmark: boolean
}

export interface AugmentedState extends Omit<CoreState, "checkpoint"> {
  checkpoint: Checkpoint | undefined,
  userName: string | undefined,
  role: RoleTypes
}

function prepCourse({ course, courseLearnData }:
  { course: Course, courseLearnData: boolean[] | undefined }) {
  if (!courseLearnData) {
    return course;
  }
  const checkpoints = course.checkpoints.map((cp, index) => {
    const isCompleted = courseLearnData[index]
    return { ...cp, isCompleted }
  })
  return { ...course, checkpoints };
}

export function initialize($state: CoreStore) {
  const initialUserData = { learnData: undefined, userName: undefined };
  const actions = bindActions($state);
  return computed([$state, $userState], (state, userData) => {
    const { course, checkpoint: checkpointId } = state;
    const role = determineRole({ state, userData });
    const { learnData, userName } = userData || initialUserData;
    const courseLearnData = learnData;
    const newCourse = prepCourse({ course, courseLearnData })
    const checkpoint = checkpointId
      ? newCourse.checkpoints.find(t => t.task === checkpointId)
      : undefined;
    const affordances = determineAffordances(role);
    return {
      state: {
        ...state,
        userName,
        role,
        course: newCourse,
        checkpoint
      },
      actions,
      affordances
    };
  })
}

