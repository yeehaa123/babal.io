import { RoleTypes } from './roleHelpers';

export function determineAffordances(role: RoleTypes) {
  const canClone = role === RoleTypes.LEARNER;
  const canBookmark = role !== RoleTypes.GUEST;
  const canCheckComplete = role === RoleTypes.LEARNER || role === RoleTypes.COLLECTOR || true;
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
}

