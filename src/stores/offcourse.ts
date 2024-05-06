import { batched } from 'nanostores'
import { $registeredCoursesState } from './courses';
import { $authState } from "@/stores/authState";

export const $offcourseState = batched(
  [$authState, $registeredCoursesState],
  (authData, courses) => {
    if (authData.userName) {
      console.log(courses);
    }
    return { ...authData, courses };
  })
