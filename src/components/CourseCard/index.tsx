import type { Course } from "@/types";
import { Card } from "@/components/ui/card"
import { useStore } from '@nanostores/react';
import CourseContent from "./CourseContent";
import Overlay from "./overlays"
import bindActions from "./stores/actions";
import {
  initiate as initiateCoreState,
} from "./stores/coreState";
import {
  determineAffordances,
  determineRole
} from "./stores/helpers";
import { $authState, login, logout } from "@/stores/authState";

export default function CourseCard(course: Course) {
  const authData = useStore($authState);
  const { $state, actions: coreActions } = initiateCoreState({ course, authData });

  const state = useStore($state);
  const role = determineRole({ state, authData });
  const affordances = determineAffordances(role);

  const actions = bindActions({ login, logout, ...coreActions });

  const { overlayMode, ...rest } = state;
  if (overlayMode) {
    return (
      <Card className="relative w-auto max-w-[380px] select-none 
    min-h-[500px] h-full w-full flex flex-col justify-between">
        <Overlay
          affordances={affordances}
          actions={actions}
          overlayMode={overlayMode}
          {...rest} />
      </Card>)
  }

  return (
    <Card className="relative w-auto max-w-[380px] select-none 
    min-h-[500px] h-full w-full flex flex-col justify-between">
      <CourseContent
        affordances={affordances}
        actions={actions}
        {...state} />
    </Card >
  )
}
