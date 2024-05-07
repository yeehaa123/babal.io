import { batched } from 'nanostores'
import { $registeredCoursesState } from './courses';
import { $authState } from "@/stores/authState";
import { determineAffordances } from "@/components/CourseCard/stores/affordancesHelpers";
import bind from "@/components/CourseCard/stores/actions"
import { RoleTypes } from "@/components/CourseCard/stores/roleHelpers";

export const $offcourseState = batched(
  [$authState, $registeredCoursesState],
  (authData, courses) => {
    const stores = courses.map((course) => {
      let checkpoint;

      const state = {
        overlayMode: undefined,
        course,
        checkpoint,
        isBookmarked: false,
        isMetaVisible: false,
      }

      const affordances = determineAffordances(RoleTypes.GUEST);
      const actions = bind(state);

      return {
        state,
        affordances,
        actions
      }
    })
    return { ...authData, courses, stores };
  })
