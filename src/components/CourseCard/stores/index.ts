import { map } from 'nanostores';
import type { MapStore } from 'nanostores';
import { $authState } from "@/stores/authState";
import { useStore } from '@nanostores/react';
import { OverlayModes } from "../types";
import type { Course, Checkpoint } from "../types";
import bindActions from "./actions";
import { useState } from 'react';
import {
  determineAffordances,
  determineRole
} from "./helpers";

export interface CoreState {
  overlayMode: OverlayModes | undefined,
  course: Course,
  isAuthenticated: boolean,
  learnData: boolean[] | undefined,
  userName: string | undefined,
  checkpoint: Checkpoint | undefined,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

export type CoreStore = MapStore<CoreState>

const courseCompletion = [true, false, false, true];

export default function initialize({ course }: { course: Course }) {
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
