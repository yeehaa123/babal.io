import type {
  CheckpointQuery,
  CourseNote,
  CourseQuery, AuthData,
} from "@/offcourse/types";

import { OverlayModes } from "../types";
import { BaseStoreActions } from "./baseActions";
import * as Course from "@/offcourse/models/Course";
import * as LearnRecord from "@/offcourse/models/LearnRecord";
import * as CardState from "@/offcourse/models/CardState";
import * as Api from "./apiActions";

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

    const clonedCourse = Course.clone(oldCourse, userName);
    const initialCardState = CardState.init(clonedCourse);
    const initialLearnRecord = LearnRecord.init(clonedCourse);

    this.setCourse(clonedCourse);
    this.setCardState(initialCardState);
    this.setLearnRecord(initialLearnRecord);
    this.hideOverlay({ courseId });
  }

  toggleBookmark = ({ courseId }: CourseQuery) => {
    const userName = this.userName;
    if (userName) {
      const oldLearnRecord = this.learnRecord[courseId] || LearnRecord.init({ courseId });
      const learnRecord = LearnRecord.toggleBookmark(oldLearnRecord);
      Api.updateBookmarkStatus(learnRecord);
      this.setLearnRecord(learnRecord);
    }
  }

  addNote = (courseNote: CourseNote & CourseQuery) => {
    const userName = this.userName;
    if (userName) {
      const { courseId } = courseNote;
      const oldLearnRecord = this.learnRecord[courseId] || LearnRecord.init({ courseId });
      const learnRecord = LearnRecord.addNote(oldLearnRecord, courseNote);
      Api.addNote(courseNote);
      this.setLearnRecord(learnRecord);
    }
  }

  toggleComplete = async ({ courseId, checkpointId }: CheckpointQuery) => {
    const userName = this.userName;
    if (userName) {
      const learnRecord = this.learnRecord[courseId] || LearnRecord.init({ courseId });
      const newLearnRecord = LearnRecord.toggleTask(learnRecord, checkpointId);
      const taskCompleted = !!newLearnRecord.tasksCompleted[checkpointId];
      Api.updateTaskStatus({ courseId, checkpointId, taskCompleted });
      this.setLearnRecord(newLearnRecord);
    }
  }

  toggleMetaVisible = ({ courseId }: CourseQuery) => {
    const oldCardState = this.get().cardStates[courseId] || CardState.init({ courseId });
    const cardState = CardState.toggleMetaVisible(oldCardState);
    this.setCardState(cardState);
  }

  fetchMissingLearnData = async (userName: string) => {
    const courseIds = this.missingCourses;
    const learnRecords = await Api.fetchLearnData({ courseIds, userName })
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
