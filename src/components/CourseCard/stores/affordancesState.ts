import { computed } from 'nanostores';
import { $roleState, RoleTypes } from "./roleState";

export const $affordancesState = computed($roleState, (
  role,
) => {
  const isClonable = role === RoleTypes.LEARNER;
  const isBookmarkable = role === RoleTypes.LEARNER || role === RoleTypes.COLLECTOR;
  const isCheckable = role === RoleTypes.LEARNER;
  const isNotable = role === RoleTypes.COLLECTOR;
  const isEditable = role === RoleTypes.COLLECTOR || role === RoleTypes.CURATOR;
  const isAuthenticable = role === RoleTypes.GUEST;
  return {
    isAuthenticable,
    isBookmarkable,
    isNotable,
    isCheckable,
    isClonable,
    isEditable
  }
})
