import { computed } from 'nanostores';
import type { CourseCardStore } from "./coreState"

function initiate($coreState: CourseCardStore) {
  return computed([$coreState], (
    {
      overlayMode,
    },
  ) => {
    return !overlayMode ? undefined : {
      title: "SIGN IN",
      onConfirm: console.log,
      onCancel: console.log
    }
  })
}

export { initiate }
