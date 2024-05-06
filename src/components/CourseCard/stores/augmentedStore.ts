import { computed } from 'nanostores';

import type { CoreState, CoreStore } from './';
import type { RoleTypes } from './roleHelpers';

import { determineRole } from "./roleHelpers"
import { determineAffordances } from "./affordancesHelpers"
import bindActions from "./actions";
import { $authState } from "@/stores/authState";
import { $learnData } from "@/stores/learnData";
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
  const actions = bindActions($state);
  return computed([$state, $authState, $learnData], (state, authData, learnData) => {
    const { userName } = authData
    const role = determineRole({ state, authData });
    const { course, checkpoint: checkpointId } = state;
    const courseLearnData = learnData[course.goal]
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

