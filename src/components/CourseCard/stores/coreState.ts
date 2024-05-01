import { map } from 'nanostores';
import type { MapStore } from 'nanostores';
import { OverlayModes } from "../types";
import type { Course, CoreState } from "../types";
import { useState } from 'react';


export type CoreStore = MapStore<CoreState>


export function initiate({ course }: { course: Course }) {
  const $coreState = map<CoreState>({
    overlayMode: undefined,
    checkpoint: undefined,
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
    $state.setKey("checkpoint", course.checkpoints.find(t => t.task === task))
  }


  const actions = { setOverlayMode, hideOverlay, selectCheckpoint };

  return { $state, actions };
}
