import type { StoreApi } from "zustand";
import type { OffcourseState } from "./types"
import type {
  CheckpointQuery,
  Course,
  CourseNote,
  CourseQuery,
  AuthData,
  Checkpoint
} from "@/offcourse/types";

import { OverlayModes } from "./types";
import { produce } from 'immer';
import { prepareCourse } from "./helpers";

type OffcourseInitialState = Omit<OffcourseState, "actions">

type Api = StoreApi<OffcourseInitialState>;

export class StoreActions {
  constructor(private set: Api["setState"], private get: Api["getState"]) { }

  private get courses() {
    return this.get().courses;
  }

  private get learnRecord() {
    return this.get().learnRecords;
  }

  private get userName() {
    return this.get().authData.userName;
  }

  private get missingCourses() {
    return Object.keys(this.courses).filter((c) =>
      (c !== Object.keys(this.learnRecord).find(cc => cc === c)));
  }

  updateUser = (authData: AuthData) => {
    this.set(produce((state) => {
      state.authData = authData;
    }))
    this.fetchMissingLearnData();
  }

  augmentCourse = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      const course = this.courses[courseId];
      const learnRecord = this.learnRecord[courseId];
      if (course) {
        state.courses[courseId] = prepareCourse({ course, learnRecord });
      }
    }))
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
      state.cardStates[newId] = {
        overlayMode: OverlayModes.NONE,
        selectedCheckpoint: undefined,
        isMetaVisible: false,
      }
    }))
    this.augmentCourse({ courseId: newId });
  }

  hideOverlay = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].overlayMode = OverlayModes.NONE;
    }))
  }

  showCloneOverlay = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].overlayMode = OverlayModes.CLONE;
    }))
  }

  showEditOverlay = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].overlayMode = OverlayModes.EDIT;
    }))
  }

  showRegisterOverlay = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].overlayMode = OverlayModes.REGISTER;
    }))
  }

  showNotesOverlay = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].overlayMode = OverlayModes.NOTE;
    }))
  }
  showShareOverlay = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].overlayMode = OverlayModes.SHARE;
    }))
  }

  showAuthOverlay = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].overlayMode = OverlayModes.AUTH;
    }))
  }

  showCheckpoint = (
    { courseId, checkpointId }: CheckpointQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].selectedCheckpoint = checkpointId;
      state.cardStates[courseId].overlayMode = OverlayModes.CHECKPOINT;
    }))
  }

  hideCheckpoint = (
    { courseId }: CourseQuery) => {
    this.set(produce((state) => {
      state.cardStates[courseId].selectedCheckpoint = undefined;
      state.cardStates[courseId].overlayMode = OverlayModes.NONE;
    }))
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
      updateLearnData({ courseId, checkpointId, userName });
      this.set(produce((state) => {
        const learnRecords = this.learnRecord[courseId];
        if (learnRecords) {
          const tasksCompleted = new Set([...learnRecords.tasksCompleted]);
          tasksCompleted.has(checkpointId)
            ? tasksCompleted.delete(checkpointId)
            : tasksCompleted.add(checkpointId)
          state.learnRecords[courseId].tasksCompleted = [...tasksCompleted];
        } else {
          const learnRecords = {
            isBookmarked: false,
            tasksCompleted: [checkpointId],
            notes: []
          }

          state.learnRecords[courseId] = learnRecords;
        }
      }))
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
export async function updateLearnData({ courseId, checkpointId, userName }:
  { courseId: Course['courseId'], userName: string, checkpointId: Checkpoint['checkpointId'] }) {
  return await fetch(`/learnRecords/${courseId}.json`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, checkpointId, userName })
  });
}



export async function fetchLearnData({ courseIds, userName }:
  { courseIds: Course['courseId'][], userName: string }) {
  if (courseIds.length > 0) {
    const response = await fetch('/learnRecords.json', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseIds, userName })
    });
    const data = await response.json();
    return data.learnRecords;
  }
}

