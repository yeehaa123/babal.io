import { map } from 'nanostores';
import type { MapStore } from 'nanostores';
import { OverlayModes } from "../types";
import type { Course, CoreState } from "../types";
import type { AuthData } from '@/stores/authState';
import { useState } from 'react';


export type CoreStore = MapStore<CoreState>

const courseCompletion = [true, false, false, true];

export function initiate({ course, authData }: { course: Course, authData: AuthData }) {
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

  function setOverlayMode(mode: OverlayModes) {
    $state.setKey("overlayMode", mode)
  }

  function hideOverlay() {
    $state.setKey("overlayMode", undefined)
  }

  function selectCheckpoint(task: string) {
    const checkpoint = course.checkpoints.find(t => t.task === task)
    const index = course.checkpoints.findIndex(t => t.task === task)
    if (checkpoint) {
      const isCompleted = learnData && learnData[index];
      $state.setKey("checkpoint", { ...checkpoint, isCompleted })
    }
  }
  function unselectCheckpoint() {
    $state.setKey("checkpoint", undefined);
  }


  const actions = { setOverlayMode, hideOverlay, selectCheckpoint, unselectCheckpoint };

  return { $state, actions };
}
