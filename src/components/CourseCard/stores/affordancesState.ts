import { computed } from 'nanostores';
import { RoleTypes } from "./roleState";
import type { RoleStore } from "./roleState";

const initiate = ($roleState: RoleStore) => {
  return computed($roleState, (
    role,
  ) => {
    const canClone = role === RoleTypes.LEARNER;
    const canBookmark = role === RoleTypes.LEARNER || role === RoleTypes.COLLECTOR;
    const canCheckComplete = role === RoleTypes.LEARNER;
    const canTakeNotes = role === RoleTypes.COLLECTOR;
    const canEdit = role === RoleTypes.CURATOR;
    const canAuthenticate = role === RoleTypes.GUEST;
    return {
      canAuthenticate,
      canBookmark,
      canTakeNotes,
      canCheckComplete,
      canClone,
      canEdit
    }
  })
}

export { initiate }
