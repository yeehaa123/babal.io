import type {
  CheckpointQuery,
  CourseNote,
  CourseQuery,
  AuthData,
} from "@/offcourse/types";

import { OverlayModes } from "../types";
import { produce } from 'immer';
import { prepareCourse } from "./helpers";
import { updateLearnData, fetchLearnData } from "./apiActions";
import { initLearnRecord, toggleBookmark, toggleTask } from "../models/LearnRecord";
import { BaseStoreActions } from "./baseActions";
import { initCardState } from "../models/CardState";

export class StoreActions extends BaseStoreActions {

  updateUser = (authData: AuthData) => {
    this.set(produce((state) => {
      state.authData = authData;
    }))
    this.fetchMissingLearnData();
  }

  augmentCourse = ({ courseId }: CourseQuery) => {
    const course = this.courses[courseId];
    const learnRecord = this.learnRecord[courseId];
    if (course && learnRecord) {
      const augmentedCourse = prepareCourse({ course, learnRecord });
      this.setCourse(augmentedCourse);
    }
  }

  cloneCourse = ({ courseId }: CourseQuery) => {
    const course = this.courses[courseId];

    if (!course) {
      throw ("TODO: ERROR")
    }

    const newId = "dfadsfljk998fdaslk";
    const newCourse = { ...course, courseId: newId, goal: "HURRAY" }

    const initialCardState = initCardState(newCourse);

    this.setCardState(initialCardState);
    this.setCourse(newCourse);
    this.hideOverlay({ courseId });
    this.augmentCourse({ courseId: newId });
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
    const learnRecord = this.learnRecord[courseId] || initLearnRecord({ courseId });
    const newLearnRecord = toggleBookmark(learnRecord);
    this.setLearnRecord(newLearnRecord);
    this.augmentCourse({ courseId });
  }

  addNote = (courseNote: CourseNote & CourseQuery) => {
    const { courseId } = courseNote;
    this.set(produce((state) => {
      const oldNotes = this.learnRecord[courseId]?.notes || [];
      state.learnRecords[courseId].notes = [courseNote, ...oldNotes];
    }))
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
    const isMetaVisible = this.get().cardStates[courseId]!.isMetaVisible;
    this.set(produce((state) => {
      state.cardStates[courseId].isMetaVisible = !isMetaVisible
    }))
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
