import type { Course } from "../types";
import type { OffcourseState } from "./types"
import { OverlayModes } from "../types"
import type { StoreApi } from "zustand";
import { produce } from 'immer';
type OffcourseInitialState = Omit<OffcourseState, "actions">

type Api = StoreApi<OffcourseInitialState>;

export class BaseStoreActions {
  constructor(protected set: Api["setState"], protected get: Api["getState"]) { }

  protected get courses() {
    return this.get().courses;
  }
  protected get learnRecord() {
    return this.get().learnRecords;
  }

  protected get userName() {
    return this.get().authData.userName;
  }

  protected get missingCourses() {
    return Object.keys(this.courses).filter((c) =>
      (c !== Object.keys(this.learnRecord).find(cc => cc === c)));
  }

  protected setOverlayMode(courseId: Course['courseId'], overlayMode: OverlayModes) {
    this.set(produce((state) => {
      state.cardStates[courseId].overlayMode = overlayMode
    }))
  }
}
