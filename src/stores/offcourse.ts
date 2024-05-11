import { createStore } from 'zustand'
import type { Course } from "@/types";
import { produce } from 'immer';
import type { StoreApi } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'


export interface StoreProps { courses: Course[] }


export type OffcourseStore = ReturnType<typeof createOffcourseStore>

type LearnData = {
  isBookmarked: boolean,
  tasksCompleted: boolean[]
}

type LearnDataState = Record<string, LearnData>

export type OffcourseInitialState = {
  courses: Record<string, Course>,
  learnData: LearnDataState,
}

export type OffcourseState = {
  courses: Record<string, Course>,
  learnData: LearnDataState,
  actions: StoreActions
}


type Api = StoreApi<OffcourseInitialState>;

class StoreActions {
  constructor(private set: Api["setState"], private get: Api["getState"]) { }

  addCourse = () => {
    const courseId = Object.keys(this.get().courses)[0]!;
    console.log(courseId);
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


export function createOffcourseStore({ courses }: StoreProps) {
  const storeEntries = courses.map(course => {
    return [course.id, course]
  });

  const initialState = {
    courses: Object.fromEntries(storeEntries),
    learnData: {}
  }
  const store = createStore(
    combine(
      initialState,
      (set, get) => ({ actions: new StoreActions(set, get) })))
  return store;
}

