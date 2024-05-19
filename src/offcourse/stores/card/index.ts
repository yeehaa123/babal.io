import type { Course } from "@/offcourse/types";

import { useOffcourseContext } from "@/offcourse/stores/collection";
import {
  determineRole,
  determineAffordances
} from "./helpers"

type StoreProps = {
  courseId: Course['courseId'],
}

export function useCourseCardStore({ courseId }: StoreProps) {
  const actions = useOffcourseContext((state) => state.actions);
  const authData = useOffcourseContext((state) => state.authData);
  const course = useOffcourseContext((state) => state.courses[courseId]);
  const cardState = useOffcourseContext((state) => state.cardStates[courseId])!;

  if (!course) {
    return
  }

  const checkpoint = course.checkpoints.find(
    cp => cp.checkpointId === cardState?.selectedCheckpoint)
  const role = determineRole({ course, authData });
  const affordances = determineAffordances(role);

  return { course, checkpoint, cardState, affordances, actions }
}
