import { computed } from 'nanostores';

import type { CoreState, CoreStore } from './';
import type { RoleTypes } from './roleHelpers';

import { determineRole } from "./roleHelpers"
import { determineAffordances } from "./affordancesHelpers"
import bindActions from "./actions";
import { $authState } from "@/stores/authState";
import { $learnData } from "@/stores/learnData";


export type Affordances = {
  canAuthenticate: boolean,
  canEdit: boolean,
  canTakeNotes: boolean,
  canClone: boolean,
  canCheckComplete: boolean,
  canBookmark: boolean
}

export interface AugmentedState extends CoreState {
  userName: string | undefined,
  role: RoleTypes
}

export function initialize($state: CoreStore) {
  const actions = bindActions($state);
  return computed([$state, $authState, $learnData], (state, authData, learnData) => {
    console.log(learnData)
    const role = determineRole({ state, authData });
    const { userName } = authData;
    const affordances = determineAffordances(role);
    return {
      state: { userName, role, ...state },
      actions,
      affordances
    };
  })
}

