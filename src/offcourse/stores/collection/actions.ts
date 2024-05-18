import type { StoreApi } from "zustand";
import type { Course, CourseNote } from "@/offcourse/types";
import type { OffcourseState } from "./"

import { produce } from 'immer';
import { prepareCourse } from "./helpers";
import type { AuthData } from "@/stores/authState";


type OffcourseInitialState = Omit<OffcourseState, "actions">

type Api = StoreApi<OffcourseInitialState>;

interface CourseQuery {
  courseId: Course['courseId']
}

interface CheckpointQuery extends CourseQuery {
  checkpointId: number
}

class StoreActions {
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
      state.courses = {
        ...this.courses,
        [newId]: { ...course, courseId: newId, goal: "HURRAY" }
      };
    }))
    this.augmentCourse({ courseId: newId });
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

  toggleComplete = ({ courseId, checkpointId }: CheckpointQuery) => {
    this.set(produce((state) => {
      if (this.learnData[courseId]) {
        const isComplete = this.learnData[courseId]?.tasksCompleted[checkpointId];
        state.learnData[courseId].tasksCompleted[checkpointId] = !isComplete
      } else {
        const learnData = {
          isBookmarked: false,
          tasksCompleted: [false, false, false, false],
          notes: []
        }

        learnData.tasksCompleted[checkpointId] = true;
        state.learnData[courseId] = learnData;
      }
    }))
    this.augmentCourse({ courseId });
  }

  login = async () => {
    const response = await fetch('/authenticate.json', { method: "POST" });
    const { userName }: AuthData = await response.json();
    console.log(userName);
    this.set(produce((state) => {
      state.authData.userName = userName;
    }))
    this.fetchMissingLearnData();
  }

  logout = async () => {
    this.set(produce((state) => {
      state.authData.userName = undefined;
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


export { StoreActions }
