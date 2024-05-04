import { map } from 'nanostores';
import { useStore } from '@nanostores/react';

import type { MapStore } from 'nanostores';
import type { Course, Checkpoint } from "@/types";
import type { Actions } from "./actions";
import type { Affordances } from "./affordanceHelper";
import type { OverlayModes } from "../overlays";

import { $authState } from "@/stores/authState";
import bindActions from "./actions";
import { useState } from 'react';
import determineAffordances from "./affordanceHelper";
import determineRole from "./roleHelper";

interface CoreState {
  overlayMode: OverlayModes | undefined,
  course: Course,
  isAuthenticated: boolean,
  learnData: boolean[] | undefined,
  userName: string | undefined,
  checkpoint: Checkpoint | undefined,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

type StoreState = {
  state: CoreState,
  actions: Actions,
  affordances: Affordances,
}

type CoreStore = MapStore<CoreState>

const courseCompletion = [true, false, false, true];

export default function initialize({ course }: { course: Course }): StoreState {
  const authData = useStore($authState);
  const userName = authData.userName;
  const isAuthenticated = !!userName;
  const learnData = isAuthenticated ? courseCompletion : undefined;
  const $coreState = map<CoreState>({
    overlayMode: undefined,
    checkpoint: undefined,
    learnData,
    isAuthenticated,
    userName,
    course,
    isBookmarked: false,
    isMetaVisible: false
  })

  const [$state] = useState($coreState);

  const actions = bindActions($state);

  const state = useStore($state);
  const role = determineRole({ state, authData });
  const affordances = determineAffordances(role);

  return { state, actions, affordances };
}

export type { CoreState, CoreStore, StoreState, Affordances, Actions }
