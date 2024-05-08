import type { Checkpoint, Course } from "@/types";
import type { Actions } from "./actions";
import type { Affordances } from "./augmentedStore";
import type { CoreStore, CoreState } from "./coreStore";

type CourseCardStore = {
  course: Course,
  checkpoint: Checkpoint | undefined,
  cardState: CoreState,
  actions: Actions,
  affordances: Affordances,
}

export function useCourseCardStore(): void {
  // const $coreState = initialize({ course });
  // const $roleState = augment($coreState);
  // const [$state] = useState($roleState);
  // return useStore($state);
}

export type { CoreState, CoreStore, CourseCardStore, Affordances, Actions }
