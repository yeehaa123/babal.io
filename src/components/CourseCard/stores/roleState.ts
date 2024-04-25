import { computed } from 'nanostores';
import { $authState } from "@/stores/authState";
import { $coreState } from "./coreState";

export enum RoleTypes {
  GUEST = "GUEST",
  LEARNER = "LEARNER",
  COLLECTOR = "COLLECTOR",
  CURATOR = "CURATOR"
}

export const $roleState = computed([$authState, $coreState], (
  { userName },
  { alias, isBookmarked }
) => {
  const isAuthenticated = !!userName;
  const isCurator = !!(alias && userName === alias);
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

