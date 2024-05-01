import { RoleTypes } from "../types";
import type { CoreState } from '../types';
import type { AuthData } from '@/stores/authState';

function determineRole({
  authState,
  state
}: { authState: AuthData, state: CoreState }) {
  const userName = authState.userName;
  const { course, isBookmarked } = state;
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
}

function determineAffordances(role: RoleTypes) {
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
}

export { determineAffordances, determineRole }
