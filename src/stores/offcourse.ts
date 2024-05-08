import { batched } from 'nanostores'
import { determineAffordances } from "@/components/CourseCard/stores/affordancesHelpers";
import bind from "@/components/CourseCard/stores/actions"
import { RoleTypes } from "@/components/CourseCard/stores/roleHelpers";
import { $coursesState, registerCourses } from './courses';
import { $learnData } from './learnData';

export const $offcourseState = batched([$coursesState, $learnData], (courses, learnData) => {
  const stores = Object.values(courses).map((course) => {
    let checkpoint;

    const cardState = {
      overlayMode: undefined,
      course,
      checkpoint,
      isBookmarked: false,
      isMetaVisible: false,
    }

    const affordances = determineAffordances(RoleTypes.GUEST);
    const actions = bind(cardState);

    return {
      course,
      checkpoint,
      cardState,
      affordances,
      actions
    }
  })
  return { stores };
})

export { registerCourses }
