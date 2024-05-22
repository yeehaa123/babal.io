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

  private get learnData() {
    return this.get().learnData;
  }

  private get userName() {
    return this.get().authData.userName;
  }

  private get missingCourses() {
    return Object.keys(this.courses).filter((c) =>
      (c !== Object.keys(this.learnData).find(cc => cc === c)));
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
      const learnData = this.learnData[courseId];
      if (course) {
        state.courses[courseId] = prepareCourse({ course, learnData });
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
      const learnData = this.learnData[courseId] || { tasksCompleted: [] };
      const isBookmarked = this.learnData[courseId]?.isBookmarked;
      state.learnData[courseId] = {
        ...learnData,
        isBookmarked: !isBookmarked
      }
    }))
    this.augmentCourse({ courseId });
  }

  addNote = (courseNote: CourseNote & CourseQuery) => {
    const { courseId } = courseNote;
    this.set(produce((state) => {
      const oldNotes = this.learnData[courseId]?.notes || [];
      state.learnData[courseId].notes = [courseNote, ...oldNotes];
    }))
    this.augmentCourse({ courseId });
  }

  toggleComplete = async ({ courseId, checkpointId }: CheckpointQuery) => {
    const userName = this.userName;
    if (userName) {
      updateLearnData({ courseId, checkpointId, userName });
      this.set(produce((state) => {
        const learnData = this.learnData[courseId];
        if (learnData) {
          const tasksCompleted = new Set([...learnData.tasksCompleted]);
          tasksCompleted.has(checkpointId)
            ? tasksCompleted.delete(checkpointId)
            : tasksCompleted.add(checkpointId)
          state.learnData[courseId].tasksCompleted = [...tasksCompleted];
        } else {
          const learnData = {
            isBookmarked: false,
            tasksCompleted: [checkpointId],
            notes: []
          }

          state.learnData[courseId] = learnData;
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
      const learnData = await fetchLearnData({ courseIds: this.missingCourses, userName })
      if (learnData) {
        for (const courseId of Object.keys(learnData)) {
          this.set(produce((state) => {
            state.learnData[courseId] = learnData[courseId]
          }))
          this.augmentCourse({ courseId });
        }
      }
    }
  }
}
export async function updateLearnData({ courseId, checkpointId, userName }:
  { courseId: Course['courseId'], userName: string, checkpointId: Checkpoint['checkpointId'] }) {
  return await fetch(`/learnData/${courseId}.json`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId, checkpointId, userName })
  });
}



export async function fetchLearnData({ courseIds, userName }:
  { courseIds: Course['courseId'][], userName: string }) {
  if (courseIds.length > 0) {
    const response = await fetch('/learnData.json', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseIds, userName })
    });
    const data = await response.json();
    return data.learnData;
  }
}

