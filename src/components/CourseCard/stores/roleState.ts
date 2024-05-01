import { computed } from 'nanostores';
import type { ReadableAtom } from 'nanostores';

import type { CourseCardStore } from "./coreState"
import { $authState } from "@/stores/authState";

export enum RoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}

export type RoleStore = ReadableAtom<RoleTypes>

const initiate = ($coreState: CourseCardStore): RoleStore => {
  return computed([$authState, $coreState], (
    { userName },
    { course, isBookmarked }
  ) => {
    const isAuthenticated = !!userName;
    const isCurator = !!(course?.curator && userName === course.curator.alias);
    if (isAuthenticated) {
      if (isCurator) {
        return RoleTypes.CURATOR;
      } else if (isBookmarked) {
        return RoleTypes.COLLECTOR;
      } else {
        return RoleTypes.LEARNER;
      }
    } else {
      return RoleTypes.GUEST;
    }
  })
}

export { initiate }
