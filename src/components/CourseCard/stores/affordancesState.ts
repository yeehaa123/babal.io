import { computed } from 'nanostores';
import { $roleState, RoleTypes } from "./roleState";

export const $affordancesState = computed($roleState, (
  role,
) => {
  const isClonable = role === RoleTypes.LEARNER;
  const isBookmarkable = role === RoleTypes.LEARNER || role === RoleTypes.COLLECTOR;
  const isCheckable = role === RoleTypes.LEARNER;
  const isEditable = role === RoleTypes.COLLECTOR || role === RoleTypes.CURATOR;
  return {
    isBookmarkable,
    isCheckable,
    isClonable,
    isEditable
  }
})
