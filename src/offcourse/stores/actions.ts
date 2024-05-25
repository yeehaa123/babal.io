import type {
  CheckpointQuery,
  CourseNote,
  CourseQuery,
  AuthData,
} from "@/offcourse/types";

import { OverlayModes } from "../types";
import { BaseStoreActions } from "./baseActions";
import { augment, clone } from "@/offcourse/models/Course";
import {
  addNote,
  initLearnRecord,
  toggleBookmark,
  toggleTask
} from "@/offcourse/models/LearnRecord";
import { initCardState, toggleMetaVisible } from "../models/CardState";
import { updateLearnData, fetchLearnData } from "./apiActions";

export class StoreActions extends BaseStoreActions {

  updateUser = (authData: AuthData) => {
    this.setAuthData(authData);
    this.fetchMissingLearnData();
  }

  augmentCourse = ({ courseId }: CourseQuery) => {
    const course = this.courses[courseId];
    const learnRecord = this.learnRecord[courseId];

    if (course && learnRecord) {
      const augmentedCourse = augment({ course, learnRecord });
      this.setCourse(augmentedCourse);
    }
  }

  cloneCourse = ({ courseId }: CourseQuery) => {
    const oldCourse = this.courses[courseId];
    const userName = this.userName;

    if (!oldCourse || !userName) {
      throw ("TODO: ERROR")
    }

    const course = clone(oldCourse, userName);

    const initialCardState = initCardState(course);

    this.setCardState(initialCardState);
    this.setCourse(course);
    this.hideOverlay({ courseId });
    this.augmentCourse({ courseId: course.courseId });
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

  toggleBookmark = ({ courseId }: CourseQuery) => {
    const oldLearnRecord = this.learnRecord[courseId] || initLearnRecord({ courseId });
    const learnRecord = toggleBookmark(oldLearnRecord);
    this.setLearnRecord(learnRecord);
    this.augmentCourse({ courseId });
  }

  addNote = (courseNote: CourseNote & CourseQuery) => {
    const { courseId } = courseNote;
    const oldLearnRecord = this.learnRecord[courseId] || initLearnRecord({ courseId });
    const learnRecord = addNote(oldLearnRecord, courseNote);
    this.setLearnRecord(learnRecord);
    this.augmentCourse({ courseId });
  }

  toggleComplete = async ({ courseId, checkpointId }: CheckpointQuery) => {
    const userName = this.userName;
    if (userName) {
      const learnRecord = this.learnRecord[courseId] || initLearnRecord({ courseId });
      const newLearnRecord = toggleTask(learnRecord, checkpointId);
      const taskCompleted = newLearnRecord.tasksCompleted[checkpointId];
      this.setLearnRecord(newLearnRecord);
      updateLearnData({ courseId, checkpointId, userName, taskCompleted });
      this.augmentCourse({ courseId });
    }
  }

  toggleMetaVisible = ({ courseId }: CourseQuery) => {
    const oldCardState = this.get().cardStates[courseId] || initCardState({ courseId });
    const cardState = toggleMetaVisible(oldCardState);
    this.setCardState(cardState);
  }

  fetchMissingLearnData = async () => {
    const userName = this.userName;
    if (userName) {
      const courseIds = this.missingCourses;
      const learnRecords = await fetchLearnData({ courseIds, userName })
      if (learnRecords) {
        for (const courseId of Object.keys(learnRecords)) {
          this.setLearnRecord(learnRecords[courseId]);
          this.augmentCourse({ courseId });
        }
      }
    }
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
