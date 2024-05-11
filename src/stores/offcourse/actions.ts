import type { StoreApi } from "zustand";
import type { Course } from "@/types";
import type { OffcourseState } from "./"
import { produce } from 'immer';

type OffcourseInitialState = Omit<OffcourseState, "actions">

type Api = StoreApi<OffcourseInitialState>;

class StoreActions {
  constructor(private set: Api["setState"], private get: Api["getState"]) { }

  addCourse = () => {
    const courseId = Object.keys(this.get().courses)[0]!;
    this.cloneCourse(courseId);
  };

  cloneCourse = (courseId: Course['id']) => this.set(produce((state) => {
    if (!courseId) {
      throw ("ERROR")
    }
    const { ...course } = this.get().courses[courseId];
    const newId = "dfadsfljk998fdaslk";
    state.courses = { ...this.get().courses, [newId]: { ...course, id: newId, goal: "HURRAY" } };
  }));

  fetchMissingLearnData = () => this.set(produce((state) => {
    const registeredCourses = Object.keys(this.get().courses);
    const registeredLearnData = Object.keys(this.get().learnData);
    const missingCourses = registeredCourses.filter((c) =>
      (c !== registeredLearnData.find(cc => cc === c)));

    for (const courseId of missingCourses) {
      state.learnData[courseId] = {
        isBookmarked: true,
        tasksCompleted: [true, true, false, false]
      }
    }
  }))
}

export { StoreActions }
