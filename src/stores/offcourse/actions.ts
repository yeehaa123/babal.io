import type { StoreApi } from "zustand";
import type { Course } from "@/types";
import type { OffcourseState } from "./"
import { produce } from 'immer';
import { prepareCourse } from "./helpers";

type OffcourseInitialState = Omit<OffcourseState, "actions">

type Api = StoreApi<OffcourseInitialState>;

type CourseQuery = {
  courseId: Course['id']
}
type CheckpointQuery = {
  courseId: Course['id'],
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

  addCourse = () => {
    const courseId = Object.keys(this.courses)[0]!;
    this.cloneCourse({ courseId });
  };

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

  fetchMissingLearnData = () => {
    for (const courseId of this.missingCourses) {
      this.set(produce((state) => {
        state.learnData[courseId] = {
          isBookmarked: true,
          tasksCompleted: [true, true, false, false]
        }
      }))
      this.augmentCourse({ courseId });
    }
  }
}

export { StoreActions }
