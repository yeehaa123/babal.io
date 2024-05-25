import type { LearnRecord } from "@/offcourse/models/LearnRecord"
import type { CardState } from "@/offcourse/models/CardState";
import type { Course, CourseQuery } from "../types";
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

  protected setCourse(course: Course) {
    const { courseId } = course;
    this.set(produce((state) => {
      state.courses[courseId] = course;
    }))
  }

  protected setLearnRecord(learnRecord: LearnRecord) {
    const { courseId } = learnRecord;
    this.set(produce((state) => {
      state.learnRecords[courseId] = learnRecord;
    }))
  }

  protected setCardState(cardState: CardState) {
    const { courseId } = cardState;
    this.set(produce((state) => {
      state.cardStates[courseId] = cardState
    }))
  }

  protected setSelectedCheckpoint({ courseId, checkpointId }: CourseQuery) {
    this.set(produce((state) => {
      state.cardStates[courseId].selectedCheckpoint = checkpointId;
    }))
  }
}
