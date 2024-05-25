import type {
  CheckpointQuery,
  CourseNote,
  CourseQuery, AuthData,
} from "@/offcourse/types";

import { OverlayModes } from "../types";
import { BaseStoreActions } from "./baseActions";
import { clone } from "@/offcourse/models/Course";
import {
  addNote,
  initLearnRecord,
  toggleBookmark,
  toggleTask
} from "@/offcourse/models/LearnRecord";
import { initCardState, toggleMetaVisible } from "../models/CardState";
import { fetchLearnData, updateBookmarkStatus, updateTaskStatus } from "./apiActions";

export class StoreActions extends BaseStoreActions {
  updateUser = (authData: AuthData) => {
    this.setAuthData(authData);
    const userName = authData.userName;
    if (userName) {
      this.fetchMissingLearnData(userName);
    }
  }

  cloneCourse = ({ courseId }: CourseQuery) => {
    const oldCourse = this.courses[courseId];
    const userName = this.userName;

    if (!oldCourse || !userName) {
      throw ("TODO: ERROR")
    }

    const clonedCourse = clone(oldCourse, userName);
    const initialCardState = initCardState(clonedCourse);
    const initialLearnRecord = initLearnRecord(clonedCourse);

    this.setCourse(clonedCourse);
    this.setCardState(initialCardState);
    this.setLearnRecord(initialLearnRecord);
    this.hideOverlay({ courseId });
  }

  toggleBookmark = ({ courseId }: CourseQuery) => {
    const userName = this.userName;
    if (userName) {
      const oldLearnRecord = this.learnRecord[courseId] || initLearnRecord({ courseId });
      const learnRecord = toggleBookmark(oldLearnRecord);
      updateBookmarkStatus(learnRecord);
      this.setLearnRecord(learnRecord);
    }
  }

  addNote = (courseNote: CourseNote & CourseQuery) => {
    const userName = this.userName;
    if (userName) {
      const { courseId } = courseNote;
      const oldLearnRecord = this.learnRecord[courseId] || initLearnRecord({ courseId });
      const learnRecord = addNote(oldLearnRecord, courseNote);
      this.setLearnRecord(learnRecord);
    }
  }

  toggleComplete = async ({ courseId, checkpointId }: CheckpointQuery) => {
    const userName = this.userName;
    if (userName) {
      const learnRecord = this.learnRecord[courseId] || initLearnRecord({ courseId });
      const newLearnRecord = toggleTask(learnRecord, checkpointId);
      const taskCompleted = !!newLearnRecord.tasksCompleted[checkpointId];
      this.setLearnRecord(newLearnRecord);
      updateTaskStatus({ courseId, checkpointId, taskCompleted });
    }
  }

  toggleMetaVisible = ({ courseId }: CourseQuery) => {
    const oldCardState = this.get().cardStates[courseId] || initCardState({ courseId });
    const cardState = toggleMetaVisible(oldCardState);
    this.setCardState(cardState);
  }

  fetchMissingLearnData = async (userName: string) => {
    const courseIds = this.missingCourses;
    const learnRecords = await fetchLearnData({ courseIds, userName })
    for (const courseId of Object.keys(learnRecords)) {
      this.setLearnRecord(learnRecords[courseId]);
    }
  }

  showCheckpointOverlay = (
    { courseId, checkpointId }: CheckpointQuery) => {
    this.setSelectedCheckpoint({ courseId, checkpointId });
    this.setOverlayMode(courseId, OverlayModes.CHECKPOINT)
  }

  hideCheckpointOverlay = (
    { courseId }: CourseQuery) => {
    this.setSelectedCheckpoint({ courseId });
    this.hideOverlay({ courseId });
  }

  hideOverlay = ({ courseId }: CourseQuery) => {
    this.setOverlayMode(courseId, OverlayModes.NONE);
  }

  showCloneOverlay = ({ courseId }: CourseQuery) => {
    this.setOverlayMode(courseId, OverlayModes.CLONE);
  }

  showEditOverlay = ({ courseId }: CourseQuery) => {
    this.setOverlayMode(courseId, OverlayModes.EDIT)
  }

  showRegisterOverlay = ({ courseId }: CourseQuery) => {
    this.setOverlayMode(courseId, OverlayModes.REGISTER)
  }

  showNotesOverlay = ({ courseId }: CourseQuery) => {
    this.setOverlayMode(courseId, OverlayModes.NOTE)
  }
  showShareOverlay = ({ courseId }: CourseQuery) => {
    this.setOverlayMode(courseId, OverlayModes.SHARE)
  }

  showAuthOverlay = ({ courseId }: CourseQuery) => {
    this.setOverlayMode(courseId, OverlayModes.AUTH)
  }
}
