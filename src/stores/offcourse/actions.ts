import type { StoreApi } from "zustand";
import type { Course } from "@/types";
import type { OffcourseState } from "./"
import { produce } from 'immer';
import { prepareCourse } from "./helpers";

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
    this.set(produce((state) => {
      const course = this.courses[courseId];
      if (!course) {
        throw ("TODO: ERROR")
      }
      const newId = "dfadsfljk998fdaslk";
      state.courses = {
        ...this.courses,
        [newId]: { ...course, id: newId, goal: "HURRAY" }
      };
    }))
  }

  toggleBookmark = ({ courseId }: CourseQuery) => {
    this.set(produce((state) => {
      const isBookmarked = this.learnData[courseId]?.isBookmarked;
      state.learnData[courseId].isBookmarked = !isBookmarked;
    }))
    this.augmentCourse({ courseId });
  }

  toggleComplete = ({ courseId, checkpointId }: CheckpointQuery) => {
    this.set(produce((state) => {
      const isComplete = this.learnData[courseId]?.tasksCompleted[checkpointId];
      state.learnData[courseId].tasksCompleted[checkpointId] = !isComplete
    }))
    this.augmentCourse({ courseId });
  }

  fetchMissingLearnData = async ({ userName }: { userName: string | undefined }) => {
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
