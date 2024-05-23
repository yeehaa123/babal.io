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
import { toggleTask } from "../models/learnData";
import { BaseStoreActions } from "./baseActions";
import { initialCardState } from "../models/cardState";

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
      this.set(produce((state) => {
        state.courses[courseId] = prepareCourse({ course, learnRecord });
      }
      ))
    }
  }

  cloneCourse = ({ courseId }: CourseQuery) => {
    const newId = "dfadsfljk998fdaslk";
    this.set(produce((state) => {
      const course = this.courses[courseId];
      if (!course) {
        throw ("TODO: ERROR")
      }

      state.cardStates[courseId].overlayMode = OverlayModes.NONE;
      state.courses = {
        ...this.courses,
        [newId]: { ...course, courseId: newId, goal: "HURRAY" }
      };

      state.cardStates[newId] = initialCardState

    }))
    this.augmentCourse({ courseId: newId });
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

  showCheckpointOverlay = (
    { courseId, checkpointId }: CheckpointQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].selectedCheckpoint = checkpointId;
    }))
    this.setOverlayMode(courseId, OverlayModes.CHECKPOINT)
  }

  hideCheckpointOverlay = (
    { courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].selectedCheckpoint = undefined;
    }))
    this.hideOverlay({ courseId });
  }

  toggleBookmark = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      const learnRecord = this.learnRecord[courseId] || { tasksCompleted: [] };
      const isBookmarked = this.learnRecord[courseId]?.isBookmarked;
      state.learnRecords[courseId] = {
        ...learnRecord,
        isBookmarked: !isBookmarked
      }
    }))
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
      const learnRecord = toggleTask(this.learnRecord[courseId], checkpointId);
      this.set(produce((state) => {
        state.learnRecords[courseId] = learnRecord;
      }))
      const taskCompleted = learnRecord.tasksCompleted[checkpointId];
      updateLearnData({ courseId, checkpointId, userName, taskCompleted });
      this.augmentCourse({ courseId });
    }
  }

  toggleMetaVisible = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      const isMetaVisible = this.get().cardStates[courseId]!.isMetaVisible;
      state.cardStates[courseId].isMetaVisible = !isMetaVisible
    }))
  }

  fetchMissingLearnData = async () => {
    const userName = this.userName;
    if (userName) {
      const learnRecords = await fetchLearnData({ courseIds: this.missingCourses, userName })
      if (learnRecords) {
        for (const courseId of Object.keys(learnRecords)) {
          this.set(produce((state) => {
            state.learnRecords[courseId] = learnRecords[courseId]
          }))
          this.augmentCourse({ courseId });
        }
      }
    }
  }
}
