import { map } from 'nanostores';
import type { MapStore } from 'nanostores';

import type { OverlayModes } from "../overlays";
import type { Course, Checkpoint } from "@/types";

export interface CoreState {
  overlayMode: OverlayModes | undefined,
  course: Course,
  checkpoint: Checkpoint | undefined,
  isBookmarked: boolean,
  isMetaVisible: boolean
}

export type CoreStore = MapStore<CoreState>

export function initialize({ course }: { course: Course }): CoreStore {
  return map<CoreState>({
    overlayMode: undefined,
    checkpoint: undefined,
    course,
    isBookmarked: false,
    isMetaVisible: false
  })
}

